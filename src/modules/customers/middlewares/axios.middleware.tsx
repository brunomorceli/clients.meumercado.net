import { useNavigate } from "react-router";
import { useStore } from "zustand";
import axios from "axios";

import { useToasterStore } from "src/modules/shared/stores";
import { useAuthStore } from "src/modules/customers/stores";
import { HomePageHandler } from "src/modules/customers/pages/HompePage";

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
    const auth =
      (getFromLocalStorage("customers-auth-store") || {}).state || {};
    if (auth && auth.token && auth.token.length !== 0) {
      config.headers["Authorization"] = `Bearer ${auth.token}`;
    }

    return config;
  },
  (error) => {
    return new Promise((resolve, reject) => {
      if (!error || !error.response) {
        return reject({
          response: {
            data: { message: "Erro desconhecido" },
          },
        });
      }

      const navigate = useNavigate();
      const authStore = useStore(useAuthStore);
      const toasterStore = useStore(useToasterStore);
      const status = error.response.status;
      if (status === 401) {
        authStore.signout();
        navigate(HomePageHandler.navigate());
      }

      if (status === 403) {
        toasterStore.warning("Você não tem permissão para acessar essa rota.");
        navigate(HomePageHandler.navigate());
      }

      reject(error);
    });
  }
);
