import { IProduct } from "@shared/interfaces";
import {
  CardContainer,
  CardTitle,
  CardPercentFlag,
  CardImage,
  CardOldPrice,
  CardPrice,
  CardPriceContainer,
  CardButtonContainer,
} from "./styles";
import { GeneralUtils } from "@shared/utils";
import { Button } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

interface ProductCardProps {
  product: IProduct;
  onClick: (product: IProduct) => void;
}

export function ProductCardItem(props: ProductCardProps) {
  const { product, onClick } = props;
  const discount: any = null;
  const price = `${GeneralUtils.getAmountLabel(
    product.price
  )}${GeneralUtils.getSulfixLabel(product.quantitySulfix, "/")}`;

  return (
    <CardContainer>
      <CardImage src={product.pictures?.[0] || "images/no-image.png"} />
      {discount && (
        <CardPercentFlag>
          {GeneralUtils.getPercentDifference(product.price, discount.price)} de
          desconto
        </CardPercentFlag>
      )}

      <CardTitle>{product.label.toLocaleUpperCase()}</CardTitle>

      <CardPriceContainer>
        {discount && <CardOldPrice>{price}</CardOldPrice>}
        <CardPrice isPromotion={Boolean(discount)}>
          {GeneralUtils.getAmountLabel(
            discount ? discount.price : product.price
          )}
        </CardPrice>
        <CardButtonContainer>
          <Button
            onClick={() => onClick(product)}
            appearance="primary"
            block
          >
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{ verticalAlign: "middle", marginRight: 5 }}
            />
            Adicionar &nbsp;
          </Button>
        </CardButtonContainer>
      </CardPriceContainer>
    </CardContainer>
  );
}
