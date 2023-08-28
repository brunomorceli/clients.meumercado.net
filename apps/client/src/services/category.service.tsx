import { ICategory } from "@/interfaces";
import { GeneralUtils } from "@/utils";
import axios from "axios";

class CategoryServiceClass {
  static instance: CategoryServiceClass;
  baseURL: string;

  private constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  }

  public static getInstance(): CategoryServiceClass {
    if (!this.instance) {
      this.instance = new CategoryServiceClass();
    }

    return this.instance;
  }

  upsert(data: ICategory): Promise<ICategory> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/categories`;
      axios[data.id ? "patch" : "post"](url, data)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar salvar categoria.")
          )
        );
    });
  }

  list(): Promise<ICategory[]> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/categories/find`;
      axios
        .get(url)
        .then((res) => resolve((res.data || {}).data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(
              e,
              "Erro ao tentar carregar categorias."
            )
          )
        );
    });
  }

  get(id: string): Promise<ICategory> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/categories/${id}/get`;
      axios
        .get(url)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(
              e,
              "Erro ao tentar carregar categoria."
            )
          )
        );
    });
  }
  remove(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/categories/${id}`;
      axios
        .delete(url)
        .then(() => resolve())
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(
              e,
              "Erro ao tentar carregar categoria."
            )
          )
        );
    });
  }
}

export const CategoryService = CategoryServiceClass.getInstance();
