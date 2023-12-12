import { useState } from "react";
import { IProductBase, IProductBaseSearch } from "src/modules/shared";
import { useStore } from "zustand";
import { useProductStore } from "src/modules/admins/stores/product.store";
import { InputSearch, TitleBase } from "src/modules/shared/components";
import { ProductBaseList } from "./List";
import { FlexboxGrid } from "rsuite";
import { useToasterStore } from "src/modules/shared/stores";

interface ProductBasesProps {
  onPick: (productBase: IProductBase) => void;
  onBack: () => void;
}

export function ProductBases(props: ProductBasesProps) {
  const { onPick, onBack } = props;
  const productStore = useStore(useProductStore);
  const toasterStore = useStore(useToasterStore);
  const [products, setProducts] = useState<IProductBase[]>([]);
  const [searching, setSearching] = useState<boolean>(false);

  function searchProducts(search: IProductBaseSearch) {
    setSearching(true);

    productStore
      .findBaseProducts(search)
      .then((result) => setProducts(result.data))
      .catch((e) => toasterStore.error(e))
      .finally(() => setSearching(false));
  }

  function handleSearch(search: IProductBaseSearch): void {
    searchProducts(search);
  }

  return (
    <>
      <TitleBase title="Meus produtos" onBack={onBack} />
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={24} style={{ marginBottom: 25 }}>
          <InputSearch
            loading={searching}
            placeholder="Buscar produto existente"
            onSearch={(label) => label && handleSearch({ label })}
          />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={24}>
          <ProductBaseList productBases={products} onPick={onPick} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
