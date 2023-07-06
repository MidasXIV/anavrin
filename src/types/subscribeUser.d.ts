type UserAlreadySubscribed = {
  type: "UserAlreadySubscribed";
};

type InvalidEmail = {
  type: "InvalidEmail";
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

type SubscribeUserErrors =
  | UserAlreadySubscribed
  | InvalidEmail
  | FailedToSubscribeUser
  | InternalServerError;

type SubscribeUserResponse = Either<SubscribeUserErrors, SubscribeUserDTO>;

type SubscribeUserControllerResponse = SubscribeUserErrors | SubscribeUserDTO;

interface ISubscribeUser {
  execute(email: string): Promise<SubscribeUserResponse>;
}
