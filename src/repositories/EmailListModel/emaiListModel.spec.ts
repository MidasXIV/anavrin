import { defineFeature, loadFeature } from "jest-cucumber";
import * as path from "path";
import { Db } from "mongodb";
import EmailListModel from "./emailListModel";
import connectToDatabase from "../../lib/mongodb";

const feature = loadFeature(path.join(__dirname, "./emailListModel.feature"));

defineFeature(feature, test => {
  let db: Db;
  let email: string;
  let emailListModel: EmailListModel;
  let result: any;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  test("Saving Email to the Email List", ({ given, when, then }) => {
    given("I provide an email ID", () => {
      // Arrange
      emailListModel = new EmailListModel(db);
      email = "test@example.com";
    });

    when("A valid email ID is passed", async () => {
      // Act
      result = await emailListModel.saveEmail(email);
    });

    then("Email is subscribed successfully", () => {
      // Assert
      expect(result).toBe("Email subscribed successfully");
    });
  });

  test("Check if email exists", ({ given, when, then }) => {
    given("I provide an email ID", () => {
      // Arrange
      emailListModel = new EmailListModel(db);
      email = "test@example.com";
    });

    given("the email ID already exists in the email list", async () => {
      // Arrange
      await emailListModel.saveEmail(email);
    });

    when("An email that does exist is passed", async () => {
      // Act
      try {
        result = await emailListModel.existsEmail(email);
      } catch (error) {
        result = error.message;
      }
    });

    then("return true", () => {
      // Assert
      expect(result).toBeTruthy();
    });

    when("An email that does not exist is passed", async () => {
      email = "test14@example.com";
      // Act
      try {
        result = await emailListModel.existsEmail(email);
      } catch (error) {
        result = error.message;
      }
    });

    then("return false", () => {
      // Assert
      expect(result).toBeFalsy();
    });
  });
});
