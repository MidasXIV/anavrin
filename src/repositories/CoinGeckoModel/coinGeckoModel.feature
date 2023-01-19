Feature: CoinGecko API interaction

  Scenario: Get Coin List successfully
    Given I call the "getCoinList" function
    When the API returns a successful response
    Then I should receive an array of coins

  # Scenario: Get Coin List with an error
  #   Given I call the "getCoinList" function
  #   When the API returns an error
  #   Then I should receive an error message

  Scenario: Fetch coin information successfully
    Given I call the "getCoinInfo" function with a valid coinId like "bitcoin"
    When the API returns a successful response
    Then I should receive a coin object with details

  # Scenario: Fetch coin information with an error
  #   Given I call the "getCoinInfo" function with an invalid "coinId"
  #   When the API returns an error
  #   Then I should receive an error message