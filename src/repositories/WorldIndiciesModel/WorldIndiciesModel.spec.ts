import { defineFeature, loadFeature } from "jest-cucumber";
import * as path from "path";
import Result from "../../lib/result";
import WorldIndiciesModel from "./worldIndiciesModel";

const feature = loadFeature(path.join(__dirname, "./worldIndiciesModel.feature"));

defineFeature(feature, test => {
  let worldIndiciesModel: WorldIndiciesModel;
  let result;
  let funcName;

  test("Get World Indicies Data successfully", ({ given, when, then }) => {
    given(/^I call the "(.*)" function$/, async _funcName => {
      funcName = _funcName;
      worldIndiciesModel = new WorldIndiciesModel();
    });

    when("the API returns a successful response", async () => {
      result = await worldIndiciesModel[funcName]();
    });

    then("I should receive an array of world indicies", () => {
      const resultSuccess: WorldIndiciesDTO = Result.getValue(result);
      expect(resultSuccess.worldIndiciesData).toHaveLength(36);
    });
  });
});
