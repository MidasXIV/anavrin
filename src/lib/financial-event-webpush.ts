import { buildEventDate } from "@/utils/timeAndDateHelpers";

export interface NotificationMessage {
  title: string;
  message: string;
}

function getImpactEmoji(impact: string): string {
  switch (impact) {
    case "1":
      return "🟢"; // Low Impact
    case "2":
      return "🟡"; // Mid Impact
    case "3":
      return "🔴"; // High Impact
    default:
      return "❓"; // Unknown Impact
  }
}

export function formatNotificationMessage(event): NotificationMessage {
  const impactEmoji = getImpactEmoji(event.impact);

  if (event.code === "EVENT_NOTIFY") {
    return {
      title: `🔔 [${impactEmoji}] Upcoming Event (${event.time}): ${event.release}`,
      message: `For: ${event.for} | Expecting: ${event.expected} | Previous: ${event.prior}`
    };
  }
  if (event.code === "EVENT_RESULT" && event.actual !== undefined) {
    const actualValue = parseFloat(event.actual).toFixed(2);
    const expectedValue = parseFloat(event.expected || "0").toFixed(2);
    const priorValue = parseFloat(event.prior || "0").toFixed(2);

    const diff = parseFloat(actualValue) - parseFloat(expectedValue);
    const diffString = diff > 0 ? "higher" : "lower";

    return {
      title: `[${impactEmoji}] Event Result (${event.time}): ${event.release}`,
      message: `Actual: ${actualValue} | Expected: ${expectedValue} | Prior: ${priorValue}\nDifference: ${diffString}`
    };
  }
  throw new Error("Invalid event or missing data");
}

export function createScheduledReminderObjects(
  events: IEcnomicCalandarItem[]
): ScheduledReminderObject[] {
  const scheduledReminders: ScheduledReminderObject[] = [];

  events.forEach(calendarItem => {
    const baseUrl = process.env.NEXTAUTH_URL
      ? `${process.env.NEXTAUTH_URL}`
      : `${process.env.NGROK_DOMAIN}`;
    const endPoint = "api/cron/economic-events-notification-handler";
    const { day, events: calendarEvents } = calendarItem;
    calendarEvents.forEach(event => {
      const formattedName = `${event.release.replace(
        /[^a-zA-Z0-9]/g,
        "-"
      )}-${new Date().getTime()}`;
      const eventDate = buildEventDate(day, event.time);

      // Create the first reminder scheduled 1 hour earlier
      const oneHourBeforeDate = new Date(eventDate);
      oneHourBeforeDate.setHours(oneHourBeforeDate.getHours() - 1);

      const oneHourBeforeReminder: ScheduledReminderObject = {
        name: `${formattedName}-1h`,
        queue: "default",
        request: {
          url: `${baseUrl}/${endPoint}`,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...event, code: "EVENT_NOTIFY" }) // Add code property
        },
        scheduled_for: oneHourBeforeDate.toISOString()
      };

      scheduledReminders.push(oneHourBeforeReminder);

      // Create the second reminder scheduled 5 minutes after
      const fiveMinutesAfterDate = new Date(eventDate);
      fiveMinutesAfterDate.setMinutes(fiveMinutesAfterDate.getMinutes() + 5);

      const fiveMinutesAfterReminder: ScheduledReminderObject = {
        name: `${formattedName}-5m`,
        queue: "default",
        request: {
          url: `${baseUrl}/${endPoint}`,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...event, code: "EVENT_RESULT" }) // Add code property
        },
        scheduled_for: fiveMinutesAfterDate.toISOString()
      };

      scheduledReminders.push(fiveMinutesAfterReminder);
    });
  });

  return scheduledReminders;
}

export function findMatchingEvent(request, data: EcnomicEventsDTO): IEcnomicEvent | null {
  // Use the `find` method to search for the first calendar item with a matching event
  const matchingEvent = data.events.reduce<IEcnomicEvent>((result, calendarItem) => {
    if (result !== null) {
      // Return the found matching event immediately
      return result;
    }
    // Use `find` to locate the first event in the current calendar item that matches the request object
    return calendarItem.events.find(
      event =>
        event.time === request.time &&
        event.release === request.release &&
        event.impact === request.impact &&
        event.for === request.for
    );
  }, null);

  // Return the matching event or null if not found
  return matchingEvent;
}
