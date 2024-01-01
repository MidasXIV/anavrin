Feature: CoinGecko API interaction

  Scenario: Get World Indicies Data successfully
    Given I call the "getWorldIndiciesData" function
    When the API returns a successful response
    Then I should receive an array of world indicies