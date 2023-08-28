import { IProduct, IProductSearch, IProductSearchResult } from "@/interfaces";
import { GeneralUtils } from "@/utils";
import axios from "axios";

class ProductServiceClass {
  static instance: ProductServiceClass;
  baseURL: string;
  
  private constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }

  public static getInstance(): ProductServiceClass {
    if (!this.instance) {
      this.instance = new ProductServiceClass();
    }

    return this.instance;
  }
  upsert(data: IProduct): Promise<IProduct> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/products`;
      axios[data.id ? 'patch' : 'post'](url, data)
        .then((res) => resolve(res.data))
        .catch((e) => reject(GeneralUtils.getErrorMessage(e, 'Erro ao tentar salvar produto.')));
    });
  }
  
  search(data: IProductSearch): Promise<IProductSearchResult> {
    const params = new URLSearchParams(data as any).toString();
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/products/find?${params}`;
      axios
        .get(url)
        .then((res) => resolve(res.data))
        .catch((e) => reject(GeneralUtils.getErrorMessage(e, 'Erro ao tentar carregar produtos.')));
    });
  }
  
  get(id: string): Promise<IProduct> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/products/${id}`;
      axios
        .get(url)
        .then((res) => resolve(res.data))
        .catch((e) => reject(GeneralUtils.getErrorMessage(e, 'Erro ao tentar carregar produto.')));
    });
  }
  remove(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/products/${id}`;
      axios
        .delete(url)
        .then(() => resolve())
        .catch((e) => reject(GeneralUtils.getErrorMessage(e, 'Erro ao tentar carregar produto.')));
    });
  }
}

export const ProductService = ProductServiceClass.getInstance();
