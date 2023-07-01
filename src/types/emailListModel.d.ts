interface IEmailListModel {
  saveEmail(email: string): Promise<boolean>;
  existsEmail(email: string): Promise<boolean>;
}
