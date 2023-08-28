import { useState } from "react";
import { IProduct } from "@/interfaces";
import { useStore } from "zustand";
import { useProductStore } from "@/stores/product.store";
import { Button, Card, List, Modal, Pagination, Typography, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Spin, Search } from "@/components";
import { ProductClientList } from "./List";

export function ProductsClient() {
  const productStore = useStore(useProductStore);
  const [search, setSearch] = useState<string>('');
  const size = 20;
  const [total, setTotal] = useState<number>(0);
  const [products, setProducts] = useState<IProduct[]>([
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
  ]);
  const [productForm, setProductForm] = useState<IProduct | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);

  function createEmptyProduct(): IProduct {
    return { label: "", price: 1, quantity: 1, categories: []  };
  }

  function handleSearch(page: number = 1): void {
    setSearching(true);

    productStore
      .search({ label: search, page })
      .then((result) => {
        setProducts(result.data);
        setTotal(result.total);
      })
      .catch((e) => message.error(e))
      .finally(() => setSearching(false));
  }

  function handleRemove(product: IProduct): void {
    console.log('remove:', product)
    /*
    setProcessing(true);

    productStore
      .remove(product.id!)
      .then(() => {
        message.success("Categoria removida com sucesso.");
        loadProduts();
      })
      .catch((e) => {
        message.error(e);
        setProcessing(false);
      });
    */
  }

  const modalPrefix = (productForm || {}).id ? "Editar" : "Adicionar";

  if (processing) {
    return <Spin />;
  }

  return (
    <Card>
      <Typography.Title level={4}>
        Produtos &nbsp;
        <Button onClick={() => setProductForm(createEmptyProduct())}>
          <PlusOutlined />
        </Button>
      </Typography.Title>
      <List>
        <List.Item>
          <Search
            loading={searching}
            placeholder="Buscar produto"
            onSearch={() => handleSearch()}
          />
        </List.Item>
        <List.Item>
          <ProductClientList
            products={products}
            onRemove={() => {}}
            onSave={(cartProduct) => { console.log('add to cart', cartProduct)}}
          />
        </List.Item>
        {products.length >= size &&
          <Pagination
            defaultCurrent={1}
            defaultPageSize={size}
            total={total}
            onChange={handleSearch}
            showSizeChanger={false}
          />
        }
      </List>
      <Modal
        title={`${modalPrefix} produto`}
        open={Boolean(productForm)}
        footer={null}
        onCancel={() => setProductForm(null)}
      ></Modal>
    </Card>
  );
}
