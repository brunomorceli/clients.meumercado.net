import { IProduct } from "@/interfaces";
import { useEffect, useState } from "react";
import { Card, Divider, Modal, Typography } from "antd";
import { ListImage, CustomTypo } from "./styles";
import { GeneralUtils } from "@/utils";
import { FireOutlined, ShoppingOutlined } from "@ant-design/icons";

interface ProductDetailsProps {
  product: IProduct | null | undefined;
  onClose: () => void;
}

export function ProductDetails(props: ProductDetailsProps) {
  const { onClose } = props;
  const [product, setProduct] = useState<IProduct>(createEmptyProduct());
  const { discount } = product;

  function createEmptyProduct(): IProduct {
    return {
      label: "",
      categories: [],
      price: 0,
      quantity: 1,
      description: "",
    };
  }

  useEffect(() => {
    setProduct(props.product || createEmptyProduct());
  }, [props.product]);

  return (
    <Modal open={Boolean(props.product)} onCancel={onClose} footer={null} title="Detalhes do produto">
      <Card cover={<ListImage src={product.cover || "images/no-image.png"} />}>
        <Typography.Title level={5}>
          {product.label.toUpperCase()}
        </Typography.Title>
        <Typography.Text disabled>{product.description}</Typography.Text>

        <Divider />

        <Typography.Title level={3}>
          <ShoppingOutlined /> Dados gerais
        </Typography.Title>

        <CustomTypo level={5} disabled>
          Preço unitário
        </CustomTypo>
        {discount ? (
          <CustomTypo level={4}>
            de: {GeneralUtils.getAmountLabel(product.price)}
            &nbsp; para: {GeneralUtils.getAmountLabel(discount.price)}
          </CustomTypo>
        ) : (
          <CustomTypo level={4}>
            {GeneralUtils.getAmountLabel(product.price)}
          </CustomTypo>
        )}

        <CustomTypo level={5} disabled>
          Quantidade em estoque
        </CustomTypo>
        <CustomTypo level={4}>{product.quantity}</CustomTypo>

        <CustomTypo level={5} disabled>
          Total
        </CustomTypo>
        <CustomTypo level={4}>
          {GeneralUtils.getAmountLabel(product.quantity * product.price)}
        </CustomTypo>

        {discount && (
          <>
            <Divider />

            <Typography.Title level={3}>
              <FireOutlined /> Promoção ativa
            </Typography.Title>

            <CustomTypo level={5} disabled>
              Nome
            </CustomTypo>
            <CustomTypo level={4}>{discount.label}</CustomTypo>

            <CustomTypo level={5} disabled>
              Preço unitário
            </CustomTypo>
            <CustomTypo level={4}>
              {GeneralUtils.getAmountLabel(discount.price)}
            </CustomTypo>

            <CustomTypo level={5} disabled>
              Desconto (valor/porcentagem)
            </CustomTypo>
            <CustomTypo level={4}>
              {GeneralUtils.getAmountLabel(
                Math.abs(product.price - discount.price)
              )}
              /
              {GeneralUtils.getPercentDifference(product.price, discount.price)}
            </CustomTypo>
            <CustomTypo level={5} disabled>
              Quantidade por compra
            </CustomTypo>
            <CustomTypo level={4}>
              min: {discount.minPerOrder} máx: {discount.maxPerOrder}
            </CustomTypo>
            <CustomTypo level={5} disabled>
              Termina em
            </CustomTypo>
            <CustomTypo level={4}>
              {new Date(discount.expireAt).toLocaleDateString()}
              {new Date().getTime() < new Date(discount.expireAt).getTime()
                ? "(ativa)"
                : "(expirada)"}
            </CustomTypo>
          </>
        )}
      </Card>
    </Modal>
  );
}
