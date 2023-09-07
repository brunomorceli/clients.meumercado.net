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
  authenticate(email: string, label?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/users/authenticate`;
      axios
        .post(url, { email, label })
        .then((res) => resolve(res.data || {}))
        .catch(() => reject('Erro ao tentar autenticar usuário.'));
    });
  }
}

export const AuthService = AuthServiceClass.getInstance();
