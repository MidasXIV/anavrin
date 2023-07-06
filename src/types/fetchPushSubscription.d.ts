interface FetchPushSubscriptionDTO {
  subscriptions: Array<PushSubscription>;
}

type FetchPushSubscriptionResponse = Either<
  UserNotLoggedIn | InternalServerError,
  FetchPushSubscriptionDTO
>;

interface IFetchPushSubscription {
  execute(): Promise<FetchPushSubscriptionResponse>;
}

type PushSubscriptionDocument = PushSubscription & {
  _id: string;
};
