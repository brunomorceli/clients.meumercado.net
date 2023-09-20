export interface IFindAddressResult {
  address: string;
  addressComplement?: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  addressNumber?: string;
}

export class IFindAddressResultHandler {
  static empty() {
    return {
      address: '',
      neighborhood: '',
      city: '',
      state: '',
      cep: '',
      addressNumber: '',
    };
  }
}