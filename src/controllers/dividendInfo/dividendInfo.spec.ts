import { defineFeature, loadFeature } from "jest-cucumber";
import * as path from "path";
import YahooFinanceRepo from "../../repositories/yahooFinanceRepo";
import DividendInfo from "./dividendInfo";

const feature = loadFeature(path.join(__dirname, "./dividendInfo.feature"));

defineFeature(feature, test => {
  let ticker: string;
  let yahooFinanceRepo;
  let dividendInfo;
  let result;

  test("Getting Dividend Info", ({ given, when, then }) => {
    given("I provide a ticker", () => {
      // Arrange
      ticker = "MCD";
      yahooFinanceRepo = new YahooFinanceRepo();
      dividendInfo = new DividendInfo(yahooFinanceRepo);
    });

    when("A valid ticker is passed", async () => {
      // Act
      result = await dividendInfo.execute(ticker);
    });

    then("Appropriate dividend information is recieved", () => {
      // Assert
      expect(result).toEqual(
        expect.objectContaining({
          AnnualDividendGrowth: expect.any(Object),
          AnnualDividends: expect.any(Object),
          EPS: expect.any(Number),
          beta: expect.any(Number),
          dividendAmount: expect.any(Number),
          dividendCurrency: expect.any(String),
          dividendPayoutRatio: expect.any(Number),
          dividendYeild: expect.any(String),
          exDividendDate: expect.any(String),
          exchange: expect.any(String),
          marketCap: expect.any(String),
          name: expect.any(String),
          paymentDate: expect.any(String),
          peRatio: expect.any(Number),
          price: expect.any(Number),
          symbol: expect.any(String)
        })
      );
    });
  });

  test("Getting Dividend Info of invalid Ticker", ({ given, when, then }) => {
    given("I provide an invalid ticker", () => {
      // Arrange
      ticker = "MCDxxxxx";
      yahooFinanceRepo = new YahooFinanceRepo();
      dividendInfo = new DividendInfo(yahooFinanceRepo);
    });

    when("An invalid ticker is passed", async () => {
      // Act
      result = await dividendInfo.execute(ticker);
    });

    then("Appropriate Error is recieved", () => {
      // Assert
      expect(result.type).toEqual("InvalidTicker");
    });
  });

  test("Getting Dividend Info of Ticker with no Dividend Info", ({ given, when, then }) => {
    given("I provide a ticker with no dividend Info", () => {
      // Arrange
      ticker = "META";
      yahooFinanceRepo = new YahooFinanceRepo();
      dividendInfo = new DividendInfo(yahooFinanceRepo);
    });

    when("An invalid ticker is passed", async () => {
      // Act
      result = await dividendInfo.execute(ticker);
    });

    then("Appropriate Error is recieved", () => {
      // Assert
      expect(result.type).toEqual("NoDividendInfo");
    });
  });
});
