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
  const discount: any = null;
  const price = `${GeneralUtils.getAmountLabel(
    product.price
  )}${GeneralUtils.getSulfixLabel(product.quantitySulfix, "/")}`;

  return (
    <CardContainer expanded={expanded}>
      <CardImage
        src={product.pictures?.[0] || "images/no-image.png"}
        onClick={() => onAdd(product)}
      />
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
        <div className="button-container">
          <Stack justifyContent="center" spacing={5}>
            <Stack.Item grow={1}>
              <Button
                onClick={() => onAdd(product)}
                appearance="primary"
                block
                startIcon={<PlusIcon />}
              >
                Adicionar
              </Button>
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
