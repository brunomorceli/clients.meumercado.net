import { ERoleType } from "@root/modules/shared";
import { IUser, IUserSearch, IUserSearchResult } from "@shared/interfaces";
import { GeneralUtils } from "@shared/utils";
import axios from "axios";

export class CustomerService {
  private static baseURL: string =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  static create(data: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/admins/users`;
      axios
        .post(url, data)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar criar cliente.")
          )
        );
    });
  }

  static update(data: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/admins/users`;
      axios
        .patch(url, data)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar salvar cliente.")
          )
        );
    });
  }

  static find(data: IUserSearch): Promise<IUserSearchResult> {
    const { role, ...paramsData } = data;
    const params = new URLSearchParams(paramsData).toString();

    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/admins/users/find?${params}&roles=${ERoleType.CUSTOMER}`;
      axios
        .get(url)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar buscar clientes.")
          )
        );
    });
  }

  static get(id: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/admins/users/${id}/get`;
      axios
        .get(url)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar buscar cliente.")
          )
        );
    });
  }

  static remove(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/admins/users/${id}`;
      axios
        .delete(url)
        .then(() => resolve())
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar remover cliente.")
          )
        );
    });
  }
}
