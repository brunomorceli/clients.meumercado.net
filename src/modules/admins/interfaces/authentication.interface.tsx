import { ISubscription } from "src/modules/shared";

export interface IAuthentication {
  token: string;
  type: "OWNER" | "EMPLOYEE" | "CLIENT";
  userName: string;
  companyId: string;
  tenantId: string;
  companyName: string;
  logo?: string | null | undefined;
  subscription?: ISubscription | null | undefined;
}

export class IAuthenticationHandler {
  static empty(): IAuthentication {
    return {
      token: "",
      type: "OWNER",
      userName: "",
      companyId: "",
      tenantId: "",
      companyName: "",
      logo: null,
    };
  }
}
