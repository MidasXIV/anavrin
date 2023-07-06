Feature: Email List Management

Scenario: Saving Email to the Email List
  Given I provide an email ID
  When A valid email ID is passed
  Then Email is subscribed successfully

Scenario: Check if email exists
  Given I provide an email ID
  And the email ID already exists in the email list
  When An email that does exist is passed
  Then return true
  When An email that does not exist is passed
  Then return false
