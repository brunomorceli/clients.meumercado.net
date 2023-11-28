import { ICheckStock, ICheckStockResult, IOrder, IOrderSearchResult, IPagination } from "src/modules/shared/interfaces";
import { GeneralUtils } from "src/modules/shared/utils";
import axios from "axios";

export class OrderService {
  private static baseURL: string = process.env.REACT_APP_API_URL || "http://localhost:3001";

  static create(data: IOrder): Promise<IOrder> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/customers/orders`;
      axios.post(url, data)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar salvar compra.")
          )
        );
    });
  }

  static list(data: IPagination): Promise<IOrderSearchResult> {
    const params = new URLSearchParams(data as any).toString();
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/customers/orders/list?${params}`;
      axios
        .get(url)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar buscar compras.")
          )
        );
    });
  }

  static get(id: number): Promise<IOrder> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/customers/orders/${id}/get`;
      axios
        .get(url)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar buscar compra.")
          )
        );
    });
  }

  static cancel(id: number, observation: string): Promise<IOrder> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/customers/orders/${id}/cancel`;
      axios
        .put(url, { observation })
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar cancelar compra.")
          )
        );
    });
  }

  static checkStock(data: ICheckStock): Promise<ICheckStockResult> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/customers/orders/check-stock`;
      axios.post(url, data)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar verificar estoque.")
          )
        );
    });
  }
}
