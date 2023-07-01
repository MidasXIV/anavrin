import Result from "../../lib/result";

export default class SubscribeUser implements ISubscribeUser {
  private model: IEmailListModel;

  constructor(model: IEmailListModel) {
    this.model = model;
  }

  public async execute(email: string): Promise<SubscribeUserResponse> {
    // Add any necessary validation logic here

    // Assume a valid email is passed.
    try {
      // check if email aready exists

      const isEmailRegistered = await this.model.existsEmail(email);
      if (isEmailRegistered) {
        return Result.fail({ type: "UserAlreadySubscribed" });
      }

      // Call the repository method to save the email to the database
      const isEmailSaved = await this.model.saveEmail(email);

      if (isEmailSaved !== true) {
        return Result.fail({ type: "FailedToSubscribeUser" });
      }

      return Result.ok({
        emailSaved: true
      });
    } catch (e) {
      console.error(e);
      return Result.fail({ type: "InternalServerError" });
    }
  }
}
