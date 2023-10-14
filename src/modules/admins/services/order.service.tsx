import { IOrder, IOrderSearchResult, IOrderUpdate, IPagination } from "@shared/interfaces";
import { GeneralUtils } from "@shared/utils";
import axios from "axios";

export class OrderService {
  private static baseURL: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  static find(data: IPagination): Promise<IOrderSearchResult> {
    const params = new URLSearchParams(data as any).toString();
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/admins/orders/find?${params}`;
      axios
        .get(url)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar buscar pedido.")
          )
        );
    });
  }

  static get(id: string): Promise<IOrder> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/admins/orders/${id}/get`;
      axios
        .get(url)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar buscar pedido.")
          )
        );
    });
  }

  static update(data: IOrderUpdate): Promise<IOrder> {
    const { id, ...payload } = data;
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}/admins/orders/${id}`;
      axios
        .patch(url, payload)
        .then((res) => resolve(res.data))
        .catch((e) =>
          reject(
            GeneralUtils.getErrorMessage(e, "Erro ao tentar atualizar pedido.")
          )
        );
    });
  }
}
