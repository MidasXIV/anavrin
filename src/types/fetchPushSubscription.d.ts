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
