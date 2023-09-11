import { IAuthenticate, IAuthentication, IConfirm } from "@/interfaces";
import axios from "axios";

class AuthServiceClass {
  static instance: AuthServiceClass;
  baseURL: string;
  
  private constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }

  public static getInstance(): AuthServiceClass {
    if (!this.instance) {
      this.instance = new AuthServiceClass();
    }

    return this.instance;
  }

  authenticate(data: IAuthenticate): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/users/authenticate`;
      axios
        .post(url, data)
        .then((res) => resolve(res.data))
        .catch(() => reject('Erro ao tentar autenticar usuário.'));
    });
  }
  
  confirm(data: IConfirm): Promise<IAuthentication> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/users/confirm`;
      axios
        .post(url, data)
        .then((response) => resolve(response.data))
        .catch(() => reject('Erro ao tentar confirmar autenticação.'));
    });
  }
}

export const AuthService = AuthServiceClass.getInstance();
