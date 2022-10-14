import { defineFeature, loadFeature } from "jest-cucumber";
import * as path from "path";
import { Db } from "mongodb";
import UserModel from "./userModel";
import connectToDatabase from "../../lib/mongodb";

const feature = loadFeature(path.join(__dirname, "./userModel.feature"));

defineFeature(feature, test => {
  let db: Db;
  let email: string;
  let userModel: IUserModel;
  let result;
  let subscription;

  beforeAll(async () => {
    db = await connectToDatabase();
  });

  test("Getting User Info", ({ given, when, then }) => {
    given("I provide an email ID", async () => {
      // Arrange
      userModel = new UserModel(db);
      email = process.env.TEST_EMAIL;
    });

    when("A valid email ID is passed", async () => {
      // Act
      result = await userModel.getUserByEmail(email);
    });

    then("Appropriate user information is recieved", () => {
      // Assert
      console.log(result);
      expect(result).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          email: expect.any(String),
          image: expect.any(String)
        })
      );
    });
  });

  test("Getting Push Subscriptions registered by Users", ({ given, when, then }) => {
    given("I provide an email ID", async () => {
      // Arrange
      userModel = new UserModel(db);
      email = process.env.TEST_EMAIL;
    });

    when("A valid email ID is passed", async () => {
      // Act
      result = await userModel.getUserSubscription(email);
    });

    then("Appropriate user information is recieved", () => {
      // Assert
      console.log(result);
      expect(result).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          email: expect.any(String),
          image: expect.any(String)
        })
      );
    });
  });

  test("Delete Push Subscription registered by User", ({ given, when, then }) => {
    given("I provide an email ID", async () => {
      // Arrange
      userModel = new UserModel(db);
      email = process.env.TEST_EMAIL;
      subscription = {
        _id: "6342b463da479c6e02e7b974",
        endpoint:
          "https://fcm.googleapis.com/fcm/send/cK3RwYlmelM:APA91bG33RDzKx__PNRzZ1KMtPziwmDPrEBa_xX94S7cLKA-1m3enkww21ppeKd-j8_aRNpSU5J04xaIUhlTKTSxLBh94dMymDd5DM4rTb6Z-bQE86UY8lPlb4l81o-OD_dJJ7KtF8sq",
        expirationTime: null,
        keys: {
          p256dh:
            "BAD52E2JwKJG1C-1OX5lEij7nncW63PwY0kZX5hm8Rpy04QY_6bQpe4gYvZawBTMnptpX9PxpAK-lQWodTluw_g",
          auth: "mjuOjcLJnlHP8IKevQI9KA"
        }
      };
    });

    when("A valid email ID is passed", async () => {
      // Act
      result = await userModel.deleteUserSubscription(email, subscription._id);
    });

    then("Appropriate user information is recieved", () => {
      // Assert
      console.log(result);
      expect(result).toBeTruthy();
    });
  });

  test("Add Push Subscription for User", ({ given, when, then }) => {
    given("I provide an email ID", async () => {
      // Arrange
      userModel = new UserModel(db);
      email = process.env.TEST_EMAIL;
      subscription = {
        endpoint:
          "https://fcm.googleapis.com/fcm/send/cd7So2HnJX8:APA91bEGeoaRfsSiNiZfdtKf8mGdWIoqvQ9WD-KywvY_Ua_rwT-SkVabQzUslVDapYS0qL6aWGjSQY1MbTu5KFuFf8FFdS8_Pr8tNYrAU8YtYyQFx9xUC9FFUp2DKTdKBBpLyjQDFaIF",
        expirationTime: null,
        keys: {
          p256dh:
            "BGGxfwN1tXYofBCsV54q9ZppCm_qklERbwR99QG2EOvcZUAmkPwXiE2BGGk6P7LDVcKsG9YXFbYa5Va0AZqjuyo",
          auth: "1-8N7Ni_7maO3Rlhm1rj8g"
        }
      };
    });

    when("A valid email ID is passed", async () => {
      // Act
      result = await userModel.addUserSubscription(email, subscription);
    });

    then("Appropriate user information is recieved", () => {
      // Assert
      console.log(result);
      expect(result).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          email: expect.any(String),
          image: expect.any(String)
        })
      );
    });
  });
});
