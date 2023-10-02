import { ISignup, IConfirm, IAuthentication } from "@customers/interfaces";
import { ISigninResponse } from "@customers/interfaces/signin-response.interface";
import axios from "axios";

export class AuthService {
  private static baseURL: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  static signin(email: string): Promise<ISigninResponse | null> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/customers/auth/signin`;
      axios
        .post(url, { email })
        .then((res) => resolve(res.status === 204 ? null : res.data))
        .catch(() => reject('Erro ao tentar autenticar usuário.'));
    });
  }

  static signup(data: ISignup): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/customers/auth/signup`;
      axios
        .post(url, data)
        .then((res) => resolve(res.data))
        .catch(() => reject('Erro ao tentar criar usuário.'));
    });
  }
  
  static confirm(data: IConfirm): Promise<IAuthentication> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/customers/auth/confirm`;
      axios
        .post(url, data)
        .then((response) => resolve(response.data))
        .catch(() => reject('Erro ao tentar confirmar autenticação.'));
    });
  }
}
