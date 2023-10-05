import { IUser, IUserHandler } from "@root/modules/shared";

export interface ISignup extends IUser {
}

export class ISignupHandler {
  static empty(): ISignup {
    return IUserHandler.empty();
  }
}
