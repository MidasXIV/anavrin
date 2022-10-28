import { defineFeature, loadFeature } from "jest-cucumber";
import * as path from "path";
import Result from "../../lib/result";
import YahooFinanceModel from "../../repositories/YahooFinanceModel/yahooFinanceModel";
import DividendInfo from "./dividendInfo";

const feature = loadFeature(path.join(__dirname, "./dividendInfo.feature"));

defineFeature(feature, test => {
  let ticker: string;
  let yahooFinanceRepo: DividendInfoScraper;
  let dividendInfo: IDividendInfo;
  let result: DividendInfoResponse;

  test("Getting Dividend Info", ({ given, when, then }) => {
    given("I provide a ticker", () => {
      // Arrange
      ticker = "NGI.AE";
      yahooFinanceRepo = new YahooFinanceModel();
      dividendInfo = new DividendInfo(yahooFinanceRepo);
    });

    when("A valid ticker is passed", async () => {
      // Act
      result = await dividendInfo.execute(ticker);
    });

    then("Appropriate dividend information is recieved", () => {
      // Assert

      if (Result.isFail(result)) {
        const resultError = Result.getError(result);
        throw Error(resultError.type);
      }

      const resultSuccess = Result.getValue(result);

      console.log(resultSuccess);
      expect(resultSuccess).toEqual(
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
      yahooFinanceRepo = new YahooFinanceModel();
      dividendInfo = new DividendInfo(yahooFinanceRepo);
    });

    when("An invalid ticker is passed", async () => {
      // Act
      result = await dividendInfo.execute(ticker);
    });

    then("Appropriate Error is recieved", () => {
      const resultError = Result.getError(result);

      // Assert
      expect(resultError.type).toEqual("InvalidTicker");
    });
  });

  test("Getting Dividend Info of Ticker with no Dividend Info", ({ given, when, then }) => {
    given("I provide a ticker with no dividend Info", () => {
      // Arrange
      ticker = "META";
      yahooFinanceRepo = new YahooFinanceModel();
      dividendInfo = new DividendInfo(yahooFinanceRepo);
    });

    when("An invalid ticker is passed", async () => {
      // Act
      result = await dividendInfo.execute(ticker);
    });

    then("Appropriate Error is recieved", () => {
      // Assert
      const resultError = Result.getError(result);

      expect(resultError.type).toEqual("NoDividendInfo");
    });
  });
});
