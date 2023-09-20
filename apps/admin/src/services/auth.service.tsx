import { ISignup, IConfirm, IAuthentication } from "@/interfaces";
import { ISigninResponse } from "@/interfaces/signin-response.interface";
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

  signin(email: string): Promise<ISigninResponse | null> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/users/signin`;
      axios
        .post(url, { email })
        .then((res) => resolve(res.status === 204 ? null : res.data))
        .catch(() => reject('Erro ao tentar autenticar usuário.'));
    });
  }

  signup(data: ISignup): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/users/signup`;
      axios
        .post(url, data)
        .then((res) => resolve(res.data))
        .catch(() => reject('Erro ao tentar criar usuário.'));
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
