import { useStore } from "zustand";
import {
  useAuthStore,
  useCartStore,
  useCompanyStore,
  useMasterpageStore,
} from "@customers/stores";
import { Drawer } from "rsuite";
import { ProductAutocomplete, ProductCart } from "..";
import {
  CartButton,
  GeneralUtils,
  ICartProduct,
  ICartProductHandler,
  IProduct,
} from "@root/modules/shared";
import { useRouter } from "next/router";

export function CartDrawer() {
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const masterpageStore = useStore(useMasterpageStore);
  const companyStore = useStore(useCompanyStore);
  const { company } = companyStore;
  const cartStore = useStore(useCartStore);
  const products = cartStore.getProducts(company.id || "");

  function handleAddProduct(product: IProduct): void {
    if (!products.some((p) => p.product.id === product.id)) {
      cartStore.addProduct(company.id!, ICartProductHandler.empty(product));
    }
  }

  function handleChageProduct(product: ICartProduct): void {
    cartStore.addProduct(company.id!, product);
  }

  function handleRemove(product: ICartProduct): void {
    cartStore.removeProduct(company.id!, product.product.id!);
  }

  function handleFinish(): void {
    masterpageStore.setCart(false);

    if (!authStore.authenticated) {
      masterpageStore.setLogin(true);
      return;
    }

    router.replace("/customers/checkout");
  }

  const totalLabel = GeneralUtils.getAmountLabel(
    products.length === 0
      ? 0
      : products
          .map((p) => p.quantity * (p.product.price || 0))
          .reduce((total, curr) => total + curr, 0)
  );

  return (
    <Drawer
      open={masterpageStore.cart}
      onClose={() => masterpageStore.toggleCart()}
    >
      <Drawer.Header>
        <Drawer.Title>Carrinho</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <ProductAutocomplete onPick={handleAddProduct} />
        <ProductCart
          products={products}
          onChange={handleChageProduct}
          onRemove={handleRemove}
        />
        {products.length === 0 && (
          <h6 style={{ marginTop: 30, marginBottom: 30 }}>
            Nenhum produto adicionado.
          </h6>
        )}

        <h3 style={{ color: '#00a700', textAlign: 'right'}}>Total: {totalLabel}</h3>
        {products.length !== 0 && (
          <CartButton
            title="Finalizar"
            options={{
              block: true,
              appearance: "primary",
              color: "green",
              size: "lg",
              style: { marginTop: 20 },
            }}
            onClick={handleFinish}
          />
        )}
      </Drawer.Body>
    </Drawer>
  );
}
