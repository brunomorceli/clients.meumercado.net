import { ICompany, IThemeHandler } from "src/modules/shared/interfaces";
import { GeneralUtils } from "src/modules/shared/utils";
import axios from "axios";

export class CompanyService {
  private static baseURL: string = process.env.REACT_APP_API_URL || "http://localhost:3001";

  static get(): Promise<ICompany> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/customers/companies`;
      axios
        .get(url)
        .then((res) => {
          const data = res.data || {};
          resolve({
            ...data,
            theme: {
              ...IThemeHandler.empty(),
              ...data.theme || {},
            }
          });
        })
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar buscar empresa.")
          )
        );
    });
  }
}
