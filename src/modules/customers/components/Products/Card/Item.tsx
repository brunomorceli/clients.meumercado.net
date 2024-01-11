import { IProduct } from "src/modules/shared/interfaces";
import {
  CardContainer,
  CardTitle,
  CardPercentFlag,
  CardImage,
  CardOldPrice,
  CardPrice,
  CardPriceContainer,
} from "./styles";
import { GeneralUtils } from "src/modules/shared/utils";
import { Button, Stack } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";
import SearchIcon from "@rsuite/icons/Search";

interface ProductCardProps {
  product: IProduct;
  expanded?: boolean;
  onAdd: (product: IProduct) => void;
  onDetails: (product: IProduct) => void;
}

export function ProductCardItem(props: ProductCardProps) {
  const { product, expanded, onAdd, onDetails } = props;
  const price = `${GeneralUtils.getAmountLabel(
    product.price
  )}${GeneralUtils.getSulfixLabel(product.quantitySulfix, "/")}`;

  return (
    <CardContainer expanded={expanded}>
      {!!product.discountPrice && (
        <CardPercentFlag>
          {GeneralUtils.getPercentDifference(
            product.price,
            product.discountPrice
          )}{" "}
          de desconto
        </CardPercentFlag>
      )}
      <CardImage
        src={product.pictures?.[0] || "images/no-image.png"}
        onClick={() => onDetails(product)}
      />

      <CardTitle>{product.label.toLocaleUpperCase()}</CardTitle>

      <CardPriceContainer>
        {!!product.discountPrice && <CardOldPrice>{price}</CardOldPrice>}
        <CardPrice isPromotion={Boolean(product.discountPrice)}>
          {GeneralUtils.getAmountLabel(
            product.discountPrice ? product.discountPrice : product.price
          )}
        </CardPrice>
        <div className="button-container">
          <Stack justifyContent="center" spacing={5}>
            <Stack.Item grow={1}>
              {product.unlimited || product.quantity > 0 ? (
                <Button
                  onClick={() => onAdd(product)}
                  appearance="primary"
                  block
                  startIcon={<PlusIcon />}
                >
                  Adicionar
                </Button>
              ) : (
                <Button disabled appearance="default" block>
                  Esgotado
                </Button>
              )}
            </Stack.Item>
            <Stack.Item>
              <Button
                appearance="primary"
                color="blue"
                size="lg"
                onClick={() => onDetails(product)}
              >
                <SearchIcon />
              </Button>
            </Stack.Item>
          </Stack>
        </div>
      </CardPriceContainer>
    </CardContainer>
  );
}
