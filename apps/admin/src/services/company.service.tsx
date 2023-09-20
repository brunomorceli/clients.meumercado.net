import { ICompany, ICompanySearch, ICompanySearchResult } from "@/interfaces";
import { GeneralUtils } from "@/utils";
import axios from "axios";

class CompanyServiceClass {
  static instance: CompanyServiceClass;
  baseURL: string;

  private constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  }

  public static getInstance(): CompanyServiceClass {
    if (!this.instance) {
      this.instance = new CompanyServiceClass();
    }

    return this.instance;
  }

  checkTenantId(tenantId: string, companyId?: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const companyIdParam = companyId ? `&companyId=${companyId}` : '';
      const url = `${this.baseURL}/companies/check-tenantId?tenantId=${tenantId}${companyIdParam}`;

      console.log(url)
      axios
        .get(url)
        .then((res) => resolve(res.data.available))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar consultar subdomínio.")
          )
        );
    });
  }

  update(data: ICompany): Promise<ICompany> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/companies`;
      axios.patch(url, data)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar salvar empresa.")
          )
        );
    });
  }

  find(data: ICompanySearch): Promise<ICompanySearchResult> {
    const params = new URLSearchParams(data as any).toString();
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/companies/find?${params}`;
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

  findByOwner(): Promise<ICompanySearchResult> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/companies/find-by-owner`;
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

  get(id: string): Promise<ICompany> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/companies/${id}/get`;
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

  remove(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/companies/${id}`;
      axios
        .delete(url)
        .then(() => resolve())
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar remover empresa.")
          )
        );
    });
  }
}

export const CompanyService = CompanyServiceClass.getInstance();
