import { defineFeature, loadFeature } from "jest-cucumber";
import * as path from "path";
import { Db } from "mongodb";
import Stripe from "stripe";
import connectToDatabase from "../../lib/mongodb";
import SubscriptionPriceModel from "./subscriptionPriceModel";
import SubscriptionProductModel from "./subscriptionProductModel";

const feature = loadFeature(path.join(__dirname, "./subscriptionPricingModel.feature"));

defineFeature(feature, test => {
  let db: Db;
  let subscriptionPriceModel: SubscriptionPriceModel;
  let subscriptionProductModel: SubscriptionProductModel;
  let result: any;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  test("Add a subscription product", ({ given, when, then }) => {
    given("I provide a product data", () => {
      // Arrange
      subscriptionProductModel = new SubscriptionProductModel(db);
    });

    when("A valid product is passed", async () => {
      // Act
      const productData = {
        name: "Hobby Subscription",
        description: "$2/Month subscription"
      };

      result = await subscriptionProductModel.createStripeProduct(productData);
    });

    then("Product is created successfully", () => {
      // Assert
      expect(result).toBeTruthy();
    });
  });

  test("Add a subscription price", ({ given, when, then }) => {
    given("I provide a valid price data", () => {
      // Arrange
      subscriptionPriceModel = new SubscriptionPriceModel(db);
    });

    when("A valid price is passed", async () => {
      // Act
      const priceData: Stripe.PriceCreateParams = {
        product: "prod_OqMMekcJOV0oAL",
        unit_amount: 200,
        currency: "usd",
        recurring: {
          interval: "month"
        }
      };

      result = await subscriptionPriceModel.createStripePrice(priceData);
    });

    then("Price is created successfully", () => {
      // Assert
      expect(result).toBeTruthy();
    });
  });

  test("Fetching all product records", ({ given, when, then }) => {
    given("There are existing product records in the database", () => {
      // Arrange
      subscriptionPriceModel = new SubscriptionPriceModel(db);
      subscriptionProductModel = new SubscriptionProductModel(db);
    });

    when("The function to fetch all product records is called", async () => {
      // Act
      const priceResult = await subscriptionPriceModel.getAllSubscriptionPriceRecords();
      const productResult = await subscriptionProductModel.getAllSubscriptionProductRecords();
      console.log(priceResult);
      console.log(productResult);
    });

    then("It should retrieve all product records successfully", () => {
      // Assert
      expect(result).toBeTruthy();
    });
  });
});
