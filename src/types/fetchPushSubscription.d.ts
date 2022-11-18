interface FetchPushSubscriptionDTO {
  subscriptions: Array<PushSubscription>;
}

type FetchPushSubscriptionResponse = Either<
  UserNotLoggedIn | InternalServerErrors,
  FetchPushSubscriptionDTO
>;

interface IFetchPushSubscription {
  execute(): Promise<FetchPushSubscriptionResponse>;
}

type PushSubscriptionDocument = PushSubscription & {
  _id: string;
};
