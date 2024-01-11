import { IUser, IUserHandler } from "src/modules/shared";

export interface ISignup extends IUser {
}

export class ISignupHandler {
  static empty(): ISignup {
    return IUserHandler.empty();
  }
}
