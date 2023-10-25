import { ERoleType } from "@shared/enums";

export interface IUserSearch {
  name?: string;
  role?: ERoleType;
  email?: string;
  cpfCnpj?: string;
  phoneNumber?: string;
}
