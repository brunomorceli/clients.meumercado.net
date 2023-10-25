export interface IBillingData {
  id?: string;
  email: string;
  phoneNumber?: string;
  cpfCnpj?: string;
  address?: string;
  addressComplement?: string;
  neighborhood?: string;
  addressNumber?: string;
  city?: string;
  state?: string;
  cep?: string;
  responsible?: string;
  createdAt?: string;
  deletedAt?: string;
}

export class IBillingDataHandler {
  static empty(): IBillingData {
    return {
      email: '',
      phoneNumber: '',
      cpfCnpj: '',
      address: '',
      addressComplement: '',
      neighborhood: '',
      addressNumber: '',
      city: '',
      state: '',
      cep: '',
      responsible: '',
    };
  }
}
