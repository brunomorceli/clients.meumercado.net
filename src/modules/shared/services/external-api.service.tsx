import { IFindAddressResult } from "@shared/interfaces/find-address-result.interface";
import { GeneralUtils } from "@shared/utils";
import axios from "axios";

class ExternalApiServiceClass {
  static instance: ExternalApiServiceClass;

  public static getInstance(): ExternalApiServiceClass {
    if (!this.instance) {
      this.instance = new ExternalApiServiceClass();
    }

    return this.instance;
  }
  findAddress(cep: string): Promise<IFindAddressResult> {
    return new Promise((resolve, reject) => {
      const cleanCep = cep.trim().replace(/[^a-z0-9]/gi, "");
      const url = `https://viacep.com.br/ws/${cleanCep}/json`;

      axios
        .get(url)
        .then((res) => {
          if (res.data.erro) {
            reject('Dados não encontrados.');
            return;
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
