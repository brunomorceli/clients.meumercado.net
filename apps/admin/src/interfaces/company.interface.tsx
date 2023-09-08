import { ECompanyStatusType } from "@/enums";

export interface ICompany {
  id?: string;
  label?: string;
  slug?: string;
  tenantId?: string;
  tenantIdCheck?: boolean;
  address?: string;
  description?: string;
  addressComplement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  addressNumber?: string;
  cep?: string;
  phoneNumber?: string;
  logo?: string;
  categories: any[],
  status?: ECompanyStatusType;
  createdAt?: string;
  deletedAt?: string;
}

export class ICompanyHandler {
  static empty(tenantIdCheck: boolean = false): ICompany {
    return {
      label: '',
      tenantId: '',
      tenantIdCheck,
      address: '',
      neighborhood: '',
      city: '',
      state: '',
      addressNumber: '',
      cep: '',
      phoneNumber: '',
      categories: [],
      status: ECompanyStatusType.ACTIVE,
    };
  }
}
