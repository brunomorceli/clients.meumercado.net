import { useStore } from "zustand";
import {
  useCartStore,
  useCompanyStore,
  useOrderStore,
} from "@customers/stores";
import { ProductCart } from "@customers/components";
import {
  CartButton,
  ECreditCardType,
  GeneralUtils,
  ICartProduct,
  IOrder,
  IOrderPayment,
  IOrderPaymentHandler,
  IOrderProductHandler,
  PanelBase,
  PaymentMethodForm,
  TitleBase,
  useToasterStore,
} from "@shared";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Message, Panel, Stack } from "rsuite";
import CheckRoundIcon from "@rsuite/icons/CheckRound";
import ArrowLeftLineIcon from "@rsuite/icons/ArrowLeftLine";

export function OrderCheckout() {
  const router = useRouter();
  const toasterStore = useStore(useToasterStore);
  const companyStore = useStore(useCompanyStore);
  const { company } = companyStore;
  const cartStore = useStore(useCartStore);
  const orderStore = useStore(useOrderStore);
  const products = cartStore.getProducts(company.id || "");
  const [payment, setPayment] = useState<IOrderPayment>({
    ...IOrderPaymentHandler.empty(),
    creditCardType: ECreditCardType.DEBIT,
  });
  const [processing, setProcessing] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  function handleChageProduct(product: ICartProduct): void {
    cartStore.addProduct(company.id!, product);
  }

  function handleRemoveProduct(product: ICartProduct): void {
    cartStore.removeProduct(company.id!, product.product.id!);
  }

  function handleCheckout(): void {
    const order: IOrder = {
      payments: [payment],
      orderLogs: [],
      orderProducts: products.map((p) =>
        IOrderProductHandler.fromProduct(p.product, p.quantity)
      ),
    };

    setProcessing(true);

    orderStore
      .create(order)
      .then(() => {
        setSent(true);
        cartStore.clear(company.id!);
        toasterStore.success('Pedido enviado com sucesso!');
      })
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  const totalLabel = GeneralUtils.getAmountLabel(
    products.length === 0
      ? 0
      : products
          .map((p) => p.quantity * (p.product.price || 0))
          .reduce((total, curr) => total + curr, 0)
  );

  if (sent) {
    return (
      <Panel bordered>
        <Message type="success">
          <Stack justifyContent="flex-start" alignItems="center">
            <Stack.Item>
              <CheckRoundIcon style={{ fontSize: 60, color: "green" }} />
            </Stack.Item>
            <Stack.Item style={{ marginLeft: 20 }}>
              <h3 style={{ margin: 0, padding: 0, height: "auto" }}>
                Pedido enviado com sucesso!
              </h3>
              <h6>Agora é só esperar para receber seu pedido.</h6>
            </Stack.Item>
          </Stack>
        </Message>
        <Stack justifyContent="flex-end" style={{ marginTop: 20 }}>
          <Button
            size="lg"
            appearance="ghost"
            color="green"
            onClick={() => router.replace("/customers")}
          >
            <ArrowLeftLineIcon /> Voltar
          </Button>
        </Stack>
      </Panel>
    );
  }

  return (
    <>
      <TitleBase title="Finalizar compra" />
      <PanelBase title="Produtos">
        <ProductCart
          products={products}
          onChange={handleChageProduct}
          onRemove={handleRemoveProduct}
        />
        {products.length === 0 && (
          <h6 style={{ marginTop: 30, marginBottom: 30 }}>
            Nenhum produto adicionado.
          </h6>
        )}
      </PanelBase>
      <PanelBase title="Pagamento">
        <PaymentMethodForm payment={payment} onChange={setPayment} />
      </PanelBase>
      <PanelBase title="Resumo" hideTitleDivider>
        <h3 style={{ color: "#00a700", textAlign: "right" }}>
          Total: {totalLabel}
        </h3>
        <Panel bordered style={{ marginTop: 20 }}>
          <strong>Observação:</strong> O preço total pode variar de acordo com a
          quantidade ou disponibilidade de alguns items.
        </Panel>
      </PanelBase>
      {products.length !== 0 && (
        <CartButton
          title="Finalizar pedido"
          options={{
            block: true,
            appearance: "primary",
            color: "green",
            size: "lg",
            style: { marginTop: 20, marginBottom: 40 },
          }}
          onClick={handleCheckout}
        />
      )}
    </>
  );
}
