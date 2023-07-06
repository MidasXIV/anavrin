interface DeletePushSubscriptionDTO {
  isSubscriptionDeleted: boolean;
}

type DeletePushSubscriptionResponse = Either<
  UserNotLoggedIn | InternalServerError,
  DeletePushSubscriptionDTO
>;

interface IDeletePushSubscription {
  execute(subscriptionId: string): Promise<DeletePushSubscriptionResponse>;
}
