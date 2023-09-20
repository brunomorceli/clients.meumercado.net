import { IRole } from ".";

export interface IAuthentication {
  token: string;
  type:   'OWNER' | 'EMPLOYEE' | 'CLIENT';
  user: {
    firstName: string;
    lastName: string;
    roles: IRole[];
  };
  company: {
    id: string;
    tenantId: string;
  };
}

export class IAuthenticationHandler {
  static empty(): IAuthentication {
    return {
      token: '',
      type: 'OWNER',
      user: {
        firstName: '',
        lastName: '',
        roles: [],
      },
      company: {
        id: '',
        tenantId: '',
      }
    }
  }
}