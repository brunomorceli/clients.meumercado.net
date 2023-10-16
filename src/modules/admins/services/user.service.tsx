import { INotification } from "@root/modules/shared";
import axios from "axios";

export class UserService {
  private static baseURL: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  static findNotification(last: number): Promise<INotification[]> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/admins/users/notifications?last=${last}`;
      axios
        .get(url)
        .then((res) => resolve(res.data || []))
        .catch(() => reject('Erro ao tentar baixar notificação.'));
    });
  }
}
