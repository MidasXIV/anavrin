Feature: Get Dividend Info

Scenario: Getting Dividend Info
  Given I provide a ticker
  When A valid ticker is passed
  Then Appropriate dividend information is recieved

Scenario: Getting Dividend Info of invalid Ticker
  Given I provide an invalid ticker
  When An invalid ticker is passed
  Then Appropriate Error is recieved

Scenario: Getting Dividend Info of Ticker with no Dividend Info
  Given I provide a ticker with no dividend Info
  When An invalid ticker is passed
  Then Appropriate Error is recieved
