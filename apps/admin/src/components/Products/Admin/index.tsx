import { useEffect, useState } from "react";
import { ICategory, IProduct, IProductHandler, IProductSearch } from "@/interfaces";
import { useStore } from "zustand";
import { useProductStore } from "@/stores/product.store";
import { Button, Card, List, Pagination, Typography, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Spin, Search, Backdrop } from "@/components";
import { ProductAdminList } from "./List";
import { ProductForm } from "./Form";
import { useCategoryStore } from "@/stores";

export function ProductsAdmin() {
  const productStore = useStore(useProductStore);
  const categoryStore = useStore(useCategoryStore);
  const [search, setSearch] = useState<string>('');
  const size = 20;
  const [total, setTotal] = useState<number>(0);
  const [products, setProducts] = useState<IProduct[]>([/*
    {
      label: 'BISCOITO RECHEIO DOCE DE LEITE BONO 90G BISCOITO RECHEIO DOCE DE LEITE BONO 90G',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam, magna suscipit pellentesque sodales, sapien mi pulvinar dolor, vel rutrum nunc risus sollicitudin libero.',
      price: 590,
      quantity: 15, 
      categories: [],
      discount: {
        label: 'My Discount',
        maxPerOrder: 20,
        minPerOrder: 1,
        price: 490,
        status: 'ACTIVE',
        expireAt: new Date('2024-01-01').toISOString(),
      },
    },
    { label: 'PALMITO PUPUNHA CONQUISTA PICADO VIDRO 300G', description: 'My description', price: 1, quantity: 1,  categories: [] },
    { label: 'SUCO EM PÓ SABOR UVA FRISCO 25G', description: 'My description', price: 1, quantity: 1,  categories: [] },
    { label: 'DETERGENTE LÍQUIDO DE LIMÃO BOM BRIL LIMPOL 500ML', description: 'My description', price: 1, quantity: 1,  categories: [] },
    { label: 'CERVEJA PILSEN DUPLO MALTE BRAHMA 350ML', description: 'My description', price: 1, quantity: 1,  categories: [] },
    { label: 'PALMITO PUPUNHA CONQUISTA PICADO VIDRO 300G', description: 'My description', price: 1, quantity: 1,  categories: [] },
    { label: 'CREME DENTAL ANTICÁRIES DE MENTA SUAVE ORAL-B 70G', description: 'My description', price: 1, quantity: 1,  categories: [] },
    { label: 'BISCOITO RECHEIO DOCE DE LEITE BONO 90G', description: 'My description', price: 1, quantity: 1,  categories: [] },
  */]);
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
      .upsert(product)
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
