import { IProductBase } from "src/modules/shared/interfaces";
import { List } from "rsuite";
import { ProductBaseListItem } from "./Item";

interface ProductListProps {
  productBases: IProductBase[];
  onPick: (product: IProductBase) => void;
}

export function ProductBaseList(props: ProductListProps) {
  const { productBases, onPick } = props;

  return (
    <>
      <List hover>
        {productBases.map((item, index) => (
          <ProductBaseListItem key={index} productBase={item} onPick={onPick} />
        ))}
        {productBases.length === 0 && (
          <List.Item>
            <strong>Nenhum resultado econtrado.</strong>
          </List.Item>
        )}
      </List>
    </>
  );
}
