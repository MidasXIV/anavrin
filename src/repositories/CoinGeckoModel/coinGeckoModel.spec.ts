import { defineFeature, loadFeature } from "jest-cucumber";
import * as path from "path";
import CoinGeckoModel from "./coinGeckoModel";

const feature = loadFeature(path.join(__dirname, "./coinGeckoModel.feature"));

defineFeature(feature, test => {
  let coinGeckoModel;
  let result;
  let funcName;
  let coinId: string;

  test("Get Coin List successfully", ({ given, when, then }) => {
    given(/^I call the "(.*)" function$/, async _funcName => {
      funcName = _funcName;
      coinGeckoModel = new CoinGeckoModel();
    });

    when("the API returns a successful response", async () => {
      result = await coinGeckoModel[funcName]();
      console.log(result);
    });

    then("I should receive an array of coins", () => {
      expect(Array.isArray(result)).toBe(true);
    });
  });

  test("Fetch coin information successfully", ({ given, when, then }) => {
    given(
      /^I call the "(.*)" function with a valid coinId like "(.*)"$/,
      async (_funcName, _coinId) => {
        funcName = _funcName;
        coinId = _coinId;
        coinGeckoModel = new CoinGeckoModel();
      }
    );

    when("the API returns a successful response", async () => {
      result = await coinGeckoModel[funcName](coinId);
      console.log(result);
    });

    then("I should receive a coin object with details", () => {
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBeDefined();
      expect(result.symbol).toBeDefined();
    });
  });
});
