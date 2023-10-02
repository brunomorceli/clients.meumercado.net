import { ICompany, ICompanySearch, ICompanySearchResult } from "@shared/interfaces";
import { GeneralUtils } from "@shared/utils";
import axios from "axios";

export class CompanyService {
  private static baseURL: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  static update(data: ICompany): Promise<ICompany> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/admins/companies`;
      axios.patch(url, data)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar salvar empresa.")
          )
        );
    });
  }

  static find(data: ICompanySearch): Promise<ICompanySearchResult> {
    const params = new URLSearchParams(data as any).toString();
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/admins/companies/find?${params}`;
      axios
        .get(url)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar buscar empresas.")
          )
        );
    });
  }

  static get(id: string): Promise<ICompany> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/admins/companies/${id}/get`;
      axios
        .get(url)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar buscar empresa.")
          )
        );
    });
  }
}
