import { IProductBase } from "src/modules/shared/interfaces";
import { Avatar, FlexboxGrid, List } from "rsuite";
import { EanLabel } from "./styles";
interface ProductBaseListItemProps {
  productBase: IProductBase;
  onPick: (product: IProductBase) => void;
}

export function ProductBaseListItem(props: ProductBaseListItemProps) {
  const { productBase, onPick } = props;

  return (
    <List.Item>
      <FlexboxGrid>
        <FlexboxGrid.Item
          colspan={2}
          onClick={() => onPick(productBase)}
          style={{ cursor: "pointer" }}
        >
          <Avatar src={productBase.picture} />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item
          colspan={22}
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={() => onPick(productBase)}
        >
          <div>{productBase.label}</div>
          <div>
            <EanLabel>{productBase.ean || "N/I"}</EanLabel>
          </div>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </List.Item>
  );
}
