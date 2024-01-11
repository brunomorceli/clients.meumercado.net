import { IProduct, IProductBaseSearch, IProductBaseSearchResult, IProductSearch, IProductSearchResult } from "src/modules/shared/interfaces";
import { GeneralUtils } from "src/modules/shared/utils";
import axios from "axios";

export class ProductService {
  private static baseURL: string = process.env.REACT_APP_API_URL || "http://localhost:3001";

  static upsert(product: IProduct): Promise<IProduct> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/admins/products`;
      axios[product.id ? 'patch' : 'post'](url, product)
        .then((res) => resolve(res.data))
        .catch((e) => reject(GeneralUtils.getErrorMessage(e, 'Erro ao tentar salvar produto.')));
    });
  }
  
  static find(data: IProductSearch): Promise<IProductSearchResult> {
    const params = new URLSearchParams(data as any).toString();
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/admins/products/find?${params}`;
      axios
        .get(url)
        .then((res) => resolve(res.data))
        .catch((e) => reject(GeneralUtils.getErrorMessage(e, 'Erro ao tentar carregar produtos.')));
    });
  }

  static findBaseProduct(data: IProductBaseSearch): Promise<IProductBaseSearchResult> {
    const params = new URLSearchParams(data as any).toString();
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/admins/product-bases/find?${params}`;
      axios
        .get(url)
        .then((res) => resolve(res.data))
        .catch((e) => reject(GeneralUtils.getErrorMessage(e, 'Erro ao tentar carregar produtos base.')));
    });
  }
  
  static get(id: string): Promise<IProduct> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/admins/products/${id}/get`;
      axios
        .get(url)
        .then((res) => resolve(res.data))
        .catch((e) => reject(GeneralUtils.getErrorMessage(e, 'Erro ao tentar carregar produto.')));
    });
  }

  static remove(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/admins/products/${id}`;
      axios
        .delete(url)
        .then(() => resolve())
        .catch((e) => reject(GeneralUtils.getErrorMessage(e, 'Erro ao tentar carregar produto.')));
    });
  }
}
