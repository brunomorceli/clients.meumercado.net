import { IProduct } from "@/interfaces";
import {
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  CardContainer,
  CardButton,
  CardTitle,
  CardPercentFlag,
  CardImage,
  CardOldPrice,
  CardPrice,
  CardPriceContainer,
  CardButtonContainer,
} from "./styles";
import { GeneralUtils } from "@/utils";

interface ProductClientProps {
  product: IProduct;
  onClick: (product: IProduct) => void;
}

export function ProductClientItem(props: ProductClientProps) {
  const { product, onClick } = props;
  const { discount } = product;

  return (
    <CardContainer>
      <CardImage src="images/no-image.png" />
      {discount && (
        <CardPercentFlag>
          {GeneralUtils.getPercentDifference(product.price, discount.price)}{" "}
          de desconto
        </CardPercentFlag>
      )}

      <CardTitle>{product.label.toLocaleUpperCase()}</CardTitle>

      <CardPriceContainer>
        {discount && (
          <CardOldPrice>
            {GeneralUtils.getAmountLabel(product.price)}
          </CardOldPrice>
        )}
        <CardPrice isPromotion={Boolean(discount)}>
          {GeneralUtils.getAmountLabel(
            discount ? discount.price : product.price
          )}
        </CardPrice>
        <CardButtonContainer>
          <CardButton onClick={() => onClick(product)} block>
            Adicionar
            &nbsp;
            <ShoppingCartOutlined
              style={{ fontSize: 20, verticalAlign: "middle" }}
            />
          </CardButton>
        </CardButtonContainer>
      </CardPriceContainer>
    </CardContainer>
  );
}
