interface DeletePushSubscriptionDTO {
  isSubscriptionDeleted: boolean;
}

type DeletePushSubscriptionResponse = Either<
  UserNotLoggedIn | InternalServerErrors,
  DeletePushSubscriptionDTO
>;

interface IDeletePushSubscription {
  execute(subscriptionId: string): Promise<DeletePushSubscriptionResponse>;
}
