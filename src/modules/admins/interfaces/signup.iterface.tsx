export interface ISignup {
  email: string;
  userName: string;
  companyName: string;
}

export class ISignupHandler {
  static empty(): ISignup {
    return {
      email: '',
      userName: '',
      companyName: '',
    };
  }
}
