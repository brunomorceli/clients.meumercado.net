
import { ICartProduct } from "@root/modules/shared";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useCartStoreProps {
  carts: any;
  addProduct: (companyId: string, product: ICartProduct) => void;
  getProduct: (companyId: string, productId: string) => ICartProduct | null;
  getProducts: (companyId: string) => ICartProduct[];
  removeProduct: (companyId: string, productId: string) => void;
}

export const useCartStore = create(
  persist<useCartStoreProps>(
    (set, get) => ({
      carts: {},

      addProduct: (companyId: string, product: ICartProduct) => {
        const cache = get();
        const carts = cache.carts;

        if (!carts[companyId]) {
          carts[companyId] = { products: [] }
        }

        const index = carts[companyId].products.findIndex(
          (p: ICartProduct) => p.product.id === product.product.id
        );

        if (index < 0) {
          carts[companyId].products.push(product);
        } else {
          carts[companyId].products[index] = product;
        }

        set({ ...cache, carts });
      },

      getProduct: (companyId: string, productId: string) => {
        const carts = get().carts;
        if (!carts[companyId]) {
          return null;
        }

        const index = carts[companyId].products.findIndex(
          (p: ICartProduct) => p.product.id === productId
        );
        if (index < 0) {
          return null;
        }

        return carts[companyId].products[index];
      },
      
      getProducts: (companyId: string) => {
        const carts = get().carts;
        if (!carts[companyId]) {
          return [];
        }

        return carts[companyId].products;
      },

      removeProduct: (companyId: string, productId: string) => {
        const cache = get();
        const carts = cache.carts;

        if (!carts[companyId]) {
          return;
        }

        const index = carts[companyId].products.findIndex(
          (p: ICartProduct) => p.product.id === productId
        );
        if (index < 0) {
          return;
        }

        carts[companyId].products.splice(index, 1);

        set({ ...cache, carts });
      },
    }),
    { name: "customer-cart-store" }
  )
);
