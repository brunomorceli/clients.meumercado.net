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
  static empty(data: any = {}) {
    return {
      address: data.address || '',
      neighborhood: data.neighborhood || '',
      city: data.city || '',
      state: data.state || '',
      cep: data.cep || '',
      addressNumber: data.addressNumber || '',
    };
  }
}