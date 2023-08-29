import { ECompanyStatusType } from "@/enums";

export interface ICompany {
  id?: string;
  label: string;
  slug?: string;
  subdomain: string;
  address: string;
  description?: string;
  addressComplement?: string;
  neighborhood: string;
  city: string;
  state: string;
  addressNumber: string;
  cep: string;
  logo?: string;
  status: ECompanyStatusType;
  createdAt?: string;
  deletedAt?: string;
}

export class ICompanyHandler {
  static empty(): ICompany {
    return {
      label: '',
      subdomain: '',
      address: '',
      neighborhood: '',
      city: '',
      state: '',
      addressNumber: '',
      cep: '',
      status: ECompanyStatusType.ACTIVE,
    };
  }
}
