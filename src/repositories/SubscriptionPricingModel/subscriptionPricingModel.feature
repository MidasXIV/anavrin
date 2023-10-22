Feature: Subscription Pricing Management

  Scenario: Add a subscription product
    Given I provide a product data
    When A valid product is passed
    Then Product is created successfully

  Scenario: Add a subscription price
    Given I provide a valid price data
    When A valid price is passed
    Then Price is created successfully

  Scenario: Fetching all product records
    Given There are existing product records in the database
    When The function to fetch all product records is called
    Then It should retrieve all product records successfully