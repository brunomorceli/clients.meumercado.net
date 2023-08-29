import { EUserType } from "@/enums";
import { ICompany } from "./company.interface";

export interface IAuthentication {
  token: string;
  userName: string;
  type: EUserType;
  companies: ICompany[];
}

export class IAuthenticationHandler {
  static empty(): IAuthentication {
    return {
      token: '',
      userName: '',
      type: EUserType.ADMIN,
      companies: [],
    };
  }
}
