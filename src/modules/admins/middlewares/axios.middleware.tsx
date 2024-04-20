import { useRequestStore } from "../stores";
import axios from "axios";

function getFromLocalStorage(key: string): any {
  const data = window.localStorage.getItem(key) || "";
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

axios.interceptors.request.use(
  (config: any) => {
    const auth = (getFromLocalStorage("admins-auth-store") || {}).state || {};
    if (auth && auth.token && auth.token.length !== 0) {
      config.headers["Authorization"] = `Bearer ${auth.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (!error || !error.response) {
      return Promise.reject({
        response: {
          data: { message: "Erro desconhecido" },
        },
      });
    }

    const status = error.response.status;

    useRequestStore.getState().setError(status);

    /*if (status === 401) {
        authStore.signout();
        navigate(CredentialsSigninHandler.navigate());
      }

      console.log("status:", status);
      if (status === 402) {
        toasterStore.warning("Seu plano chegou no limite.");
        navigate(PlansPageHandler.navigate());
      }

      if (status === 403) {
        toasterStore.warning("Você não tem permissão para acessar essa rota.");
        navigate(HomePageHandler.navigate());
      }*/

    return Promise.reject(error);
  }
);
