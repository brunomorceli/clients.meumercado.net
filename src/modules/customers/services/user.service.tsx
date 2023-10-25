import { IUser } from "@shared/interfaces";
import { GeneralUtils } from "@shared/utils";
import axios from "axios";

export class UserService {
  private static baseURL: string =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  static self(): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/customers/users/self`;
      axios
        .get(url)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar buscar usuário.")
          )
        );
    });
  }

  static update(data: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/customers/users`;
      axios
        .patch(url, data)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar salvar usuário.")
          )
        );
    });
  }
}
