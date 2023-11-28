import { useCallback, useEffect, useState } from "react";
import { IProduct, IProductSearch } from "src/modules/shared";
import { useStore } from "zustand";
import { useProductStore } from "src/modules/admins/stores/product.store";
import {
  PanelBase,
  InputSearch,
  TitleBase,
} from "src/modules/shared/components";
import { ProductList } from "./List";
import { useNavigate } from "react-router";
import { FlexboxGrid } from "rsuite";
import { useToasterStore } from "src/modules/shared/stores";
import { ProductsCreateHandler } from "../../pages/Products/ProductsCreatePage";
import { HomePageHandler } from "../../pages/HomePage";
import { ProductsEditHandler } from "../../pages/Products/ProductsEditPage";

export function Products() {
  const navigate = useNavigate();
  const productStore = useStore(useProductStore);
  const toasterStore = useStore(useToasterStore);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const searchProducts = useCallback(
    (search: IProductSearch = {}) => {
      setSearching(true);

      productStore
        .find(search)
        .then((result) => {
          setProducts(result.data);
        })
        .catch((e) => toasterStore.error(e))
        .finally(() => setSearching(false));
    },
    [productStore, toasterStore]
  );

  useEffect(() => {
    searchProducts();
  }, [searchProducts]);

  function handleSearch(search: IProductSearch = {}): void {
    searchProducts(search);
  }

  function handleRemove(product: IProduct): void {
    setProcessing(true);

    productStore
      .remove(product.id!)
      .then(() => {
        toasterStore.success("Produto removido com sucesso.");

        handleSearch();
      })
      .catch((e) => {
        toasterStore.error(e);
        setProcessing(false);
      });
  }

  return (
    <>
      <TitleBase title="Meus produtos" onBack={() => navigate(HomePageHandler.navigate())} />
      <PanelBase
        title="Produtos"
        hideTitleDivider
        onAdd={() => navigate(ProductsCreateHandler.navigate())}
      >
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={24} style={{ marginBottom: 25 }}>
            <InputSearch
              loading={searching}
              placeholder="Buscar produto"
              onSearch={(label) => handleSearch(label ? { label } : undefined)}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={24}>
            <ProductList
              products={products}
              onEdit={(p) => navigate(ProductsEditHandler.navigate(p.id!))}
              onRemove={handleRemove}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </PanelBase>
    </>
  );
}
