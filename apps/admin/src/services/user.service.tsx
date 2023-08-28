import { IConfirm, ISignin } from "@/interfaces";
import axios from "axios";

class UserServiceClass {
  static instance: UserServiceClass;
  baseURL: string;
  
  private constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }

  public static getInstance(): UserServiceClass {
    if (!this.instance) {
      this.instance = new UserServiceClass();
    }

    return this.instance;
  }
  signin(data: ISignin): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/users/authenticate`;
      axios
        .post(url, data)
        .then(() => resolve())
        .catch(() => reject('Erro ao tentar autenticar usuário.'));
    });
  }
  
  confirm(data: IConfirm): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/users/confirm`;
      axios
        .post(url, data)
        .then((response) => resolve(response.data))
        .catch(() => reject('Erro ao tentar confirmar autenticação.'));
    });
  }
}

export const UserService = UserServiceClass.getInstance();
