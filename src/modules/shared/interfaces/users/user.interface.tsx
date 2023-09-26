import { ERoleType, EUSerStatusType } from "@shared/enums";
import { IBillingData, IDeliveryData } from ".";

export interface IUser {
  id?: string;
  companyId?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: ERoleType;
  phoneNumber?: string;
  cpfCnpj?: string;
  address?: string;
  addressComplement?: string;
  neighborhood?: string;
  addressNumber?: string;
  city?: string;
  state?: string;
  cep?: string;
  status: EUSerStatusType;
  billingData?: IBillingData;
  deliveryData?: IDeliveryData;

  createdAt?: string;
  deletedAt?: string;
}

export class IUserHandler {
  static empty(role?: ERoleType): IUser {
    return {
      firstName: '',
      lastName: '',
      email: '',
      role: role || ERoleType.MEMBER,
      phoneNumber: '',
      cpfCnpj: '',
      address: '',
      addressComplement: '',
      neighborhood: '',
      addressNumber: '',
      city: '',
      state: '',
      cep: '',
      status: EUSerStatusType.ACTIVE,
    };
  }
}
