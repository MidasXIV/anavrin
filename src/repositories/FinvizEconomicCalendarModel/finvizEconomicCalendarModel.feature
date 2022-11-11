Feature: Finviz Ecnomic Calendar

Scenario: Getting Ecnomic Events
  Given I wait for ecnomic events
  When Appropriate response is recieved
  Then Response items are in desired format
