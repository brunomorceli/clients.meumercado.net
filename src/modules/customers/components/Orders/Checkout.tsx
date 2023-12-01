import { useNavigate } from "react-router";
import { useState } from "react";
import { useStore } from "zustand";
import {
  Button,
  Message,
  Panel,
  RadioTile,
  RadioTileGroup,
  Stack,
} from "rsuite";
import CheckRoundIcon from "@rsuite/icons/CheckRound";
import ArrowLeftLineIcon from "@rsuite/icons/ArrowLeftLine";

import { ProductCart } from "src/modules/customers/components";
import { HomePageHandler } from "src/modules/customers/pages/HompePage";
import {
  useCartStore,
  useCompanyStore,
  useOrderStore,
} from "src/modules/customers/stores";
import {
  CartButton,
  ECreditCardType,
  EDeliveryType,
  GeneralUtils,
  ICartProduct,
  ICheckStock,
  IOrder,
  IOrderPayment,
  IOrderPaymentHandler,
  IOrderProductHandler,
  IStockProduct,
  PanelBase,
  PaymentMethodForm,
  TitleBase,
  useToasterStore,
} from "src/modules/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";

export function OrderCheckout() {
  const navigate = useNavigate();
  const toasterStore = useStore(useToasterStore);
  const companyStore = useStore(useCompanyStore);
  const { company } = companyStore;
  const cartStore = useStore(useCartStore);
  const orderStore = useStore(useOrderStore);
  const products = cartStore.getProducts(company.id || "");
  const [deliveryType, setDeliveryType] = useState<EDeliveryType>(EDeliveryType.DELIVERY);
  const [payment, setPayment] = useState<IOrderPayment>({
    ...IOrderPaymentHandler.empty(),
    creditCardType: ECreditCardType.DEBIT,
  });
  const [processing, setProcessing] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  async function updateStock(
    clientId: string,
    cartProducts: ICartProduct[]
  ): Promise<ICartProduct[]> {
    setProcessing(true);

    const data: ICheckStock = {
      products: cartProducts.map(
        (p) =>
          ({
            productId: p.product.id,
            quantity: p.quantity,
          } as IStockProduct)
      ),
    };

    const res = await orderStore.checkStock(data);

    return cartStore.updateStock(clientId, res.products);
  }

  function handleChageProduct(product: ICartProduct): void {
    cartStore.addProduct(company.id!, product);
  }

  function handleRemoveProduct(product: ICartProduct): void {
    cartStore.removeProduct(company.id!, product.product.id!);
  }

  function handleCheckout(): void {
    const order: IOrder = {
      payments: [payment],
      deliveryType,
      orderLogs: [],
      orderProducts: products.map((p) =>
        IOrderProductHandler.fromProduct(p.product, p.quantity)
      ),
    };

    setProcessing(true);

    updateStock(company.id!, products)
      .then((cartProducts) => {
        if (cartProducts.some((cp) => cp.quantity > cp.product.quantity)) {
          toasterStore.error(
            "Alguns produtos se encontram fora de estoque, por favor, atualize os valores antes de prosseguir."
          );

          return;
        }

        orderStore
          .create(order)
          .then(() => {
            setSent(true);
            cartStore.clear(company.id!);
            toasterStore.success("Pedido enviado com sucesso!");
          })
          .catch(toasterStore.error)
          .finally(() => setProcessing(false));
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
            onClick={() => navigate(HomePageHandler.navigate())}
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

      <PanelBase title="Entrega">
        <RadioTileGroup
          defaultValue={deliveryType}
          aria-label="Tipo de entrega"
          onChange={(t) => setDeliveryType(t as EDeliveryType)}
        >
          <RadioTile
            icon={<FontAwesomeIcon icon={faBoxOpen} />}
            label="Quero receber em casa"
            value={EDeliveryType.DELIVERY}
          >
            Quero que receber em minha casa por meio de um entregador.
          </RadioTile>

          <RadioTile
            icon={<FontAwesomeIcon icon={faBagShopping} />}
            label="Quero retirar no local"
            value={EDeliveryType.CARRY}
          >
            Quero retirar minha compra/entrega no local.
          </RadioTile>
        </RadioTileGroup>
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
