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

  Scenario: Add Push Subscription for User
    Given I provide an email ID
    When A valid email ID is passed
    Then Appropriate user information is recieved

  Scenario: Retrieving all user subscriptions
    Given there are multiple users with push subscriptions
    When the user requests all subscriptions
    Then the user should receive all subscriptions from the database