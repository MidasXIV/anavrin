Feature: Mergent Scheduler Model

Scenario: Batch create tasks
  Given I have a Mergent Scheduler Model
  When I batch create tasks with valid data
  Then the tasks are created successfully
