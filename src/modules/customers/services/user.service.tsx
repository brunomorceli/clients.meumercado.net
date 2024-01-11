import { INotification, IUser } from "src/modules/shared/interfaces";
import { GeneralUtils } from "src/modules/shared/utils";
import axios from "axios";

export class UserService {
  private static baseURL: string =
    process.env.REACT_APP_API_URL || "http://localhost:3001";

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

  static findNotification(last: number): Promise<INotification[]> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/customers/users/notifications?last=${last}`;
      axios
        .get(url)
        .then((res) => resolve(res.data || []))
        .catch(() => reject('Erro ao tentar baixar notificação.'));
    });
  }
}
