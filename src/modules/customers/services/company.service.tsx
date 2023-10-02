import { ICompany } from "@shared/interfaces";
import { GeneralUtils } from "@shared/utils";
import axios from "axios";

export class CompanyService {
  private static baseURL: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  static get(): Promise<ICompany> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/customers/companies`;
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