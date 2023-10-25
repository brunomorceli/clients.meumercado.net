/* eslint-disable @next/next/no-img-element */
import { IProduct } from "@shared/interfaces";
import { Avatar, FlexboxGrid, IconButton, List } from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";
import { GeneralUtils } from "@shared/utils";
import { PriceLabel } from "./styles";
interface ProductListItemProps {
  product: IProduct;
  onPick: (product: IProduct) => void;
  onRemove: (product: IProduct) => void;
}

export function ProductListItem(props: ProductListItemProps) {
  const { product, onPick, onRemove } = props;

  return (
    <List.Item>
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={2} onClick={() => onPick(product)} style={{ cursor: 'pointer' }}>
        <Avatar
          src={
            product.pictures.length !== 0 ? product.pictures[0] : undefined
          }
        />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item
        colspan={16}
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          overflow: "hidden",
          cursor: 'pointer'
        }}
        onClick={() => onPick(product)}
      >
        <div>{product.label}</div>
        <div>
          <PriceLabel showPrice={product.showPrice}>
            {product.showPrice ? GeneralUtils.getAmountLabel(product.price) : 'Não exibido'}
          </PriceLabel>
        </div>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4} onClick={() => onPick(product)} style={{ cursor: 'pointer' }}>
         <PriceLabel showPrice={product.showPrice}>
          {product.showPrice ? GeneralUtils.getAmountLabel(product.price) : 'Não exibido'}
         </PriceLabel>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={2}>
        <IconButton
          circle
          icon={<TrashIcon />}
          size="sm"
          onClick={() => onRemove(product)}
        />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </List.Item>
);
}
