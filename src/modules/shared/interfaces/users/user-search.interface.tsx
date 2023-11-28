import { ERoleType } from "src/modules/shared/enums";

export interface IUserSearch {
  name?: string;
  role?: ERoleType;
  email?: string;
  cpfCnpj?: string;
  phoneNumber?: string;
}
