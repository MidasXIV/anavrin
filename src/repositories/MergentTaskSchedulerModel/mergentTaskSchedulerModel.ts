import Result from "../../lib/result";

export default class MergentSchedulerModel {
  /** ***************************************************************************************
   *
   *                                   Public Methods
   *
   **************************************************************************************** */

  public async createBatchTasks(tasks) {
    try {
      const tasksBody = JSON.stringify(tasks);
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MERGENT_APIKEY}`,
          "Content-Type": "application/json"
        },
        // body: '[{"name":"name-of-task-2","queue":"default","request":{"url":"https://example.com","headers":{"Content-Type":"application/json"},"body":"Hello, world!"},"scheduled_for":"2024-04-06T15:53:05Z","delay":"5m"},{"name":"name-of-task-3","queue":"default","request":{"url":"https://example.com","headers":{"Content-Type":"application/json"},"body":"Hello, world!"},"scheduled_for":"2024-04-06T15:53:05Z","delay":"5m"}]'
        body: tasksBody
      };

      try {
        const res = await fetch("https://api.mergent.co/v2/tasks/batch-create", options);
        const parsed = await res.json();
        return Result.ok(parsed);
      } catch (err) {
        console.error(err);
      }
    } catch (e) {
      console.error(e);
    }
    return Result.fail({ type: "UnableToCreateTasks" });
  }
}
