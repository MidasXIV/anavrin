Feature: MongoDB User interaction

Scenario: Getting User Info
  Given I provide an email ID
  When A valid email ID is passed
  Then Appropriate user information is recieved

Scenario: Getting Push Subscriptions registered by Users
  Given I provide an email ID
  When A valid email ID is passed
  Then Appropriate user information is recieved

Scenario: Delete Push Subscription registered by User
  Given I provide an email ID
  When A valid email ID is passed
  Then Appropriate user information is recieved
