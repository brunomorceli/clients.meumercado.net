import { useEffect, useState } from "react";
import { ICategory, IProduct, IProductHandler, IProductSearch } from "@/interfaces";
import { useStore } from "zustand";
import { useProductStore } from "@/stores/product.store";
import { Button, Card, List, Pagination, Typography, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Spin, Search, Backdrop } from "@/components";
import { ProductAdminList } from "./List";
import { ProductForm } from "./Form";
import { useAuthStore, useCategoryStore } from "@/stores";

export function ProductsAdmin() {
  const authStore = useStore(useAuthStore);
  const productStore = useStore(useProductStore);
  const categoryStore = useStore(useCategoryStore);
  const [search, setSearch] = useState<string>('');
  const size = 20;
  const [total, setTotal] = useState<number>(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productForm, setProductForm] = useState<IProduct | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);

  useEffect(() => { handleSearch(); }, []);

  useEffect(() => {
    categoryStore
      .list()
      .then((list) => setCategories(list))
      .catch((e) => message.error(e));
  }, [categoryStore]);

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

        setSearch('');
        handleSearch();
      })
      .catch((e) => {
        message.error(e);
        setProcessing(false);
      });
  }

  function handleSave(product: IProduct): void {
    setProcessing(true);

    productStore
      .upsert({ ...product, companyId: authStore.auth.selectedCompany?.id })
      .then(() => {
        message.success('Produto salvo com sucesso');

        setProcessing(false);
        setProductForm(null);
        setSearch('');
        handleSearch();
      })
      .catch((e) => {
        setProcessing(false);
        message.error(e);
      });
  }

  return (
    <>
      <Card>
        <Typography.Title level={4}>
          Produtos &nbsp;
          <Button onClick={() => setProductForm(IProductHandler.getEmptyProduct())}>
            <PlusOutlined />
          </Button>
        </Typography.Title>
        <List>
          <List.Item>
            <Search
              loading={searching}
              placeholder="Buscar produto"
              onSearch={(label) => handleSearch(label ? { label } : undefined)}
            />
          </List.Item>
          <ProductAdminList
            products={products}
            onEdit={(p) => setProductForm(p)}
            onRemove={handleRemove}
          />
          {products.length >= size &&
            <Pagination
              defaultCurrent={1}
              defaultPageSize={size}
              total={total}
              onChange={(page) => handleSearch({ page })}
              showSizeChanger={false}
            />
          }
        </List>
        <ProductForm
          product={productForm}
          categories={categories}
          onSave={handleSave}
          onClose={() => setProductForm(null)}
        />
      </Card>
      <Backdrop open={processing} />
    </>
  );
}
