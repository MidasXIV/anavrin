type UserNotLoggedIn = {
  type: "UserNotLoggedIn";
};

type MaxSubscriptionsReached = {
  type: "MaxSubscriptionsReached";
};

type FailedToUpdateSubscription = {
  type: "FailedToUpdateSubscription";
};

type InternalServerError = {
  type: "InternalServerError";
};

interface SaveSubscriptionDTO {
  userUpdated: boolean;
}

type SaveSubscriptionResponse = Either<
  UserNotLoggedIn | MaxSubscriptionsReached | FailedToUpdateSubscription | InternalServerError,
  SaveSubscriptionDTO
>;

interface ISaveSubscription {
  execute(subscription: PushSubscription): Promise<SaveSubscriptionResponse>;
}
