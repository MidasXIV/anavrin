interface ScheduledReminderObject {
  name: string;
  queue: string;
  request: {
    url: string;
    headers: { [key: string]: string };
    body: string;
  };
  // eslint-disable-next-line camelcase
  scheduled_for: string;
  delay?: string;
}
