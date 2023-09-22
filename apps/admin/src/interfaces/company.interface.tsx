import { ECompanyStatusType } from "@/enums";

export interface ICompany {
  id?: string;
  name?: string;
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
  email?: string;
  responsible?: string;
  logo?: string | null | undefined;
  categories: any[],
  status?: ECompanyStatusType;
  createdAt?: string;
  deletedAt?: string;
}

export class ICompanyHandler {
  static empty(tenantIdCheck: boolean = false): ICompany {
    return {
      name: '',
      tenantId: '',
      tenantIdCheck,
      address: '',
      neighborhood: '',
      city: '',
      state: '',
      addressNumber: '',
      cep: '',
      phoneNumber: '',
      email: '',
      responsible: '',
      logo: null,
      categories: [],
      status: ECompanyStatusType.ACTIVE,
    };
  }
}
