import { IFindAddressResult } from "@/interfaces/find-address-result.interface";
import { GeneralUtils } from "@/utils";
import axios from "axios";

class ExternalApiServiceClass {
  static instance: ExternalApiServiceClass;

  public static getInstance(): ExternalApiServiceClass {
    if (!this.instance) {
      this.instance = new ExternalApiServiceClass();
    }

    return this.instance;
  }
  findAddress(cep: string): Promise<IFindAddressResult | null> {
    return new Promise((resolve, reject) => {
      const cleanCep = cep.trim().replace(/[^a-z0-9]/gi, "");
      const url = `https://viacep.com.br/ws/${cleanCep}/json`;

      axios
        .get(url)
        .then((res) => {
          if (!res || !res.data || res.data.error) {
            return null;
          }

          const data = (res || {}).data || {};

          resolve({
            cep: data.cep || "",
            address: data.logradouro || "",
            addressComplement: data.complemento || "",
            neighborhood: data.bairro || "",
            city: data.localidade || "",
            state: data.uf || "",
          });
        })
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar buscar endereço.")
          )
        );
    });
  }
}

export const ExternalApiService = ExternalApiServiceClass.getInstance();
