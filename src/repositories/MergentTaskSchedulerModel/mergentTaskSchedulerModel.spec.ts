import { defineFeature, loadFeature } from "jest-cucumber";
import * as path from "path";
import MergentSchedulerModel from "./mergentTaskSchedulerModel";

const feature = loadFeature(path.join(__dirname, "./mergentTaskSchedulerModel.feature"));

function* generateScheduledTime(): Generator<string, void, void> {
  let currentTime = new Date();

  while (true) {
    currentTime = new Date(currentTime.getTime() + 2 * 60 * 1000); // 2 minutes from now
    yield currentTime.toISOString();
  }
}

defineFeature(feature, test => {
  let scheduler: MergentSchedulerModel;
  let result: any;
  const scheduledTimeIterator = generateScheduledTime();
  test("Batch create tasks", ({ given, when, then }) => {
    given("I have a Mergent Scheduler Model", () => {
      scheduler = new MergentSchedulerModel();
    });

    when("I batch create tasks with valid data", async () => {
      // Implement your setup logic for creating tasks with valid data
      // Example: scheduler.batchCreateTasks(validData);
      const tasks = [
        {
          name: "TestEvent---Final-1712437364822-1h",
          queue: "default",
          request: {
            url: "https://amazed-saving-lynx.ngrok-free.app/api/cron/economic-events-notification-handler",
            headers: {
              "Content-Type": "application/json"
            },
            body: '{"time":"10:00 AM","release":"Business Inventories","impact":"2","for":"Feb","actual":"0.4%","expected":"0.3%","prior":"0.0%","code":"EVENT_NOTIFY"}'
          },
          scheduled_for: scheduledTimeIterator.next().value
        },
        {
          name: "TestEvent---Final-1712437364822-5m",
          queue: "default",
          request: {
            url: "https://amazed-saving-lynx.ngrok-free.app/api/cron/economic-events-notification-handler",
            headers: {
              "Content-Type": "application/json"
            },
            body: '{"time":"10:00 AM","release":"Business Inventories","impact":"2","for":"Feb","actual":"0.4%","expected":"0.3%","prior":"0.0%","code":"EVENT_RESULT"}'
          },
          scheduled_for: scheduledTimeIterator.next().value
        }
      ];
      result = await scheduler.createBatchTasks(tasks);
    });

    then("the tasks are created successfully", () => {
      // Implement your assertion logic to verify that tasks are created successfully
      // Example: expect(result).toBeSuccessful();
      console.log(result);
    });
  });
});
