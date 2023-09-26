import { IRole } from ".";

export interface IAuthentication {
  token: string;
  type:   'OWNER' | 'EMPLOYEE' | 'CLIENT';
  userName: string;
  roles: IRole[];
  companyId: string;
  tenantId: string;
  companyName: string;
  logo?: string | null | undefined;
}

export class IAuthenticationHandler {
  static empty(): IAuthentication {
    return {
      token: '',
      type: 'OWNER',
      userName: '',
      roles: [],
      companyId: '',
      tenantId: '',
      companyName: '',
      logo: null,
    }
  }
}