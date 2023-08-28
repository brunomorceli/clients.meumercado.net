import { useCallback, useEffect, useState } from "react";
import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { GeneralUtils } from "@/utils";
import { ICartProduct, IProduct } from "@/interfaces";
import {
  CardDescription,
  CardOldPrice,
  CardPrice,
  CardLabel,
  CardAddButton,
  CardActionContainer,
  ModalCustom,
} from "./styles";
import { Button, Card, Image, InputNumber, Typography } from "antd";

interface ProductListItemProps {
  cartProduct: ICartProduct | null | undefined;
  onSave: (cartProduct: ICartProduct) => void;
  onClose: () => void;
}

export function ProductCardForm(props: ProductListItemProps) {
  const createEmptyCartProduct = useCallback(() => {
    return {
      product: createEmptyProduct(),
      quantity: 1,
    };
  }, []);

  const { onSave, onClose } = props;
  const [cartProduct, setCartProduct] = useState<ICartProduct>(
    createEmptyCartProduct()
  );
  const { product } = cartProduct;
  const { discount } = product;
  const maxQuantity = Math.max(
    discount ? discount.maxPerOrder : 0,
    product.quantity
  );

  function createEmptyProduct(): IProduct {
    return {
      label: "",
      categories: [],
      price: 0,
      quantity: 20,
      description: "",
    };
  }

  useEffect(() => {
    setCartProduct(props.cartProduct || createEmptyCartProduct());
  }, [props.cartProduct, createEmptyCartProduct]);

  function handleChangeQuantity(val: number): void {
    setCartProduct({
      product,
      quantity: GeneralUtils.clamp(val, 1, maxQuantity),
    });
  }

  return (
    <ModalCustom
      open={Boolean(props.cartProduct)}
      onCancel={props.onClose}
      footer={null}
      title={null}
      closeIcon={null}
    >
      <Card
        style={{ width: "100%" }}
        cover={
          <Image
            alt={product.label}
            src={product.cover || "images/no-image.png"}
          />
        }
      >
        <CardLabel>{product.label.toUpperCase()}</CardLabel>
        {product.description && (
          <CardDescription>{product.description}</CardDescription>
        )}

        {discount && (
          <CardOldPrice>
            {GeneralUtils.getAmountLabel(discount.price)}
          </CardOldPrice>
        )}

        <CardPrice isPromotion={Boolean(discount)}>
          <span style={{ fontSize: 15 }}>Total:</span>
          &nbsp;
          {GeneralUtils.getAmountLabel(product.price * cartProduct.quantity)}
        </CardPrice>

        <CardActionContainer>
          <Button
            size="large"
            icon={<MinusOutlined />}
            onClick={() => handleChangeQuantity(cartProduct.quantity - 1)}
          />
          <InputNumber
            size="large"
            min={1}
            max={cartProduct.quantity}
            value={cartProduct.quantity}
            addonAfter={
              <Typography.Text strong>/ {maxQuantity}</Typography.Text>
            }
            onChange={(val) => handleChangeQuantity(val || 1)}
          />
          <Button
            size="large"
            icon={<PlusOutlined />}
            onClick={() => handleChangeQuantity(cartProduct.quantity + 1)}
          />
        </CardActionContainer>

        <CardAddButton block onClick={() => onSave(cartProduct)}>
          Adicionar &nbsp;
          <ShoppingCartOutlined
            style={{ fontSize: 20, verticalAlign: "middle" }}
          />
        </CardAddButton>
        <Button block onClick={onClose}>
          Voltar
        </Button>
      </Card>
    </ModalCustom>
  );
}
