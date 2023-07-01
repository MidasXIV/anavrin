type UserAlreadySubscribed = {
  type: "UserAlreadySubscribed";
};

type InternalServerError = {
  type: "InternalServerError";
};

type FailedToSubscribeUser = {
  type: "FailedToSubscribeUser";
};

interface SubscribeUserDTO {
  emailSaved: boolean;
}

type SubscribeUserResponse = Either<
  UserAlreadySubscribed | FailedToSubscribeUser | InternalServerErrors,
  SubscribeUserDTO
>;

interface ISubscribeUser {
  execute(email: string): Promise<SubscribeUserResponse>;
}
