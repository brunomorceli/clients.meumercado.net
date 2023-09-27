import { useCallback, useEffect, useState } from "react";
import { IProduct, IProductSearch } from "@shared/interfaces";
import { useStore } from "zustand";
import { useProductStore } from "@admins/stores/product.store";
import { PanelBase, InputSearch, TitleBase } from "@shared/components";
import { ProductList } from "./List";
import { useRouter } from "next/router";
import { Pagination } from "antd";
import { FlexboxGrid } from "rsuite";
import { useToasterStore } from "@shared/stores";

export function Products() {
  const router = useRouter();
  const productStore = useStore(useProductStore);
  const toasterStore = useStore(useToasterStore);
  const [search, setSearch] = useState<string>("");
  const size = 20;
  const [total, setTotal] = useState<number>(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const searchProducts = useCallback((search: IProductSearch = {}) => {
    setSearching(true);

    productStore
      .find(search)
      .then((result) => {
        setProducts(result.data);
        setTotal(result.total);
      })
      .catch((e) => toasterStore.error(e))
      .finally(() => setSearching(false));    
  }, [productStore, toasterStore]);

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

        setSearch("");
        handleSearch();
      })
      .catch((e) => {
        toasterStore.error(e);
        setProcessing(false);
      });
  }

  return (
    <>
      <TitleBase title="Meus produtos" onBack={() => router.replace('/admins')} />
      <PanelBase
        title="Produtos"
        hideTitleDivider
        onAdd={() => router.replace("/admins/products/create")}
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
              onEdit={(p) => router.replace(`/admins/products/${p.id}`)}
              onRemove={handleRemove}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={24}>
            {products.length >= size && (
              <Pagination
                defaultCurrent={1}
                defaultPageSize={size}
                total={total}
                onChange={(page) => handleSearch({ page })}
                showSizeChanger={false}
              />
            )}
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </PanelBase>
    </>
  );
}
