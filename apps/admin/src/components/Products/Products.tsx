import { useEffect, useState } from "react";
import { IProduct, IProductSearch } from "@/interfaces";
import { useStore } from "zustand";
import { useProductStore } from "@/stores/product.store";
import { PanelBase, Search, TitleBase } from "@/components";
import { ProductList } from "./List";
import { useRouter } from "next/router";
import { Pagination, message } from "antd";
import { FlexboxGrid } from "rsuite";

export function Products() {
  const router = useRouter();
  const productStore = useStore(useProductStore);
  const [search, setSearch] = useState<string>("");
  const size = 20;
  const [total, setTotal] = useState<number>(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);

  useEffect(() => {
    handleSearch();
  }, []);

  function handleSearch(search: IProductSearch = {}): void {
    setSearching(true);

    productStore
      .find(search)
      .then((result) => {
        setProducts(result.data);
        setTotal(result.total);
      })
      .catch((e) => message.error(e))
      .finally(() => setSearching(false));
  }

  function handleRemove(product: IProduct): void {
    setProcessing(true);

    productStore
      .remove(product.id!)
      .then(() => {
        message.success("Produto removido com sucesso.");

        setSearch("");
        handleSearch();
      })
      .catch((e) => {
        message.error(e);
        setProcessing(false);
      });
  }

  return (
    <>
      <TitleBase title="Meus produtos" onBack={() => router.replace('/')} />
      <PanelBase
        title="Produtos"
        hideTitleDivider
        onAdd={() => router.replace("/products/create")}
      >
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={24} style={{ marginBottom: 25 }}>
            <Search
              loading={searching}
              placeholder="Buscar produto"
              onSearch={(label) => handleSearch(label ? { label } : undefined)}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={24}>
            <ProductList
              products={products}
              onEdit={(p) => router.replace(`/products/${p.id}`)}
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
