import { defineFeature, loadFeature } from "jest-cucumber";
import * as path from "path";
import Result from "../../lib/result";
import FinvizEconomicCalendarModel from "./finvizEconomicCalendarModel";

const feature = loadFeature(path.join(__dirname, "./finvizEconomicCalendarModel.feature"));

defineFeature(feature, test => {
  let finvizEconomicCalendarModel: IFinvizEconomicCalendarModel;
  let result: EcnomicEventsResponse;

  test("Getting Ecnomic Events", ({ given, when, then }) => {
    given("I wait for ecnomic events", async () => {
      // Arrange
      finvizEconomicCalendarModel = new FinvizEconomicCalendarModel();
    });

    when("Appropriate response is recieved", async () => {
      // Act
      result = await finvizEconomicCalendarModel.getEcnomicEvents();
    });

    then("Response items are in desired format", () => {
      if (Result.isFail(result)) {
        const resultError = Result.getError(result);
        throw Error(resultError.type);
      }

      const resultSuccess = Result.getValue(result);

      // Assert
      expect(resultSuccess).toEqual(
        expect.objectContaining({
          events: expect.arrayContaining([
            expect.objectContaining({
              day: expect.any(String),
              events: expect.arrayContaining([
                expect.objectContaining({
                  actual: expect.any(String),
                  expected: expect.any(String),
                  for: expect.any(String),
                  impact: expect.any(String),
                  prior: expect.any(String),
                  release: expect.any(String),
                  time: expect.any(String)
                })
              ])
            })
          ])
        })
      );
    });
  });
});
