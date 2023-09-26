"use client";

import { useAuthStore, useToasterStore } from "@shared/stores";
import axios from "axios";
import { useRouter } from "next/router";
import { useStore } from "zustand";

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
    const auth = (getFromLocalStorage("auth-store") || {}).state || {};
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

      const router = useRouter();
      const authStore = useStore(useAuthStore);
      const toasterStore = useStore(useToasterStore);
      const status = error.response.status;
      if (status === 401) {
        authStore.signout();
        router.replace("/admins/signin");
      }

      if (status === 403) {
        toasterStore.warning("Você não tem permissão para acessar essa rota.");
        router.replace("/");
      }

      reject(error);
    });
  }
);
