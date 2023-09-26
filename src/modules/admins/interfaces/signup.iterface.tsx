export interface ISignup {
  email: string;
  firstName: string;
  lastName: string;
  label: string;
}

export class ISignupHandler {
  static empty(): ISignup {
    return {
      email: '',
      firstName: '',
      lastName: '',
      label: '',
    };
  }
}
