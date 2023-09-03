'use client';

import { ICategory, IProduct, IProductHandler } from "@/interfaces";
import Highlighter from "react-highlight-words";
import {
  AutoComplete,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Switch,
  Tag,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { CardCustom } from "./styles";
import { ImageCrop, Currency } from "@/components";
import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface ProductFormProps {
  product?: IProduct | null | undefined;
  categories: ICategory[];
  onSave: (product: IProduct) => void;
  onClose: () => void;
}

export function ProductForm(props: ProductFormProps) {
  const { categories, onSave, onClose } = props;
  const [categorySearch, setCategorySearch] = useState<string>("");
  const [formHandler] = Form.useForm();
  const [product, setProduct] = useState<IProduct>(
    IProductHandler.getEmptyProduct()
  );

  useEffect(() => {
    const data: any = props.product || IProductHandler.getEmptyProduct();
    setProduct(data);

    Object.keys(data).forEach((key) => {
      formHandler.setFieldValue(key, data[key]);
    });

    !props.product && setCategorySearch("");
  }, [formHandler, props.product]);

  function filterBySearch(category: ICategory): boolean {
    const target = categorySearch.toLocaleLowerCase();
    return category.label.toLocaleLowerCase().indexOf(target) !== -1;
  }

  function getCategoryOptions(): any {
    if (categorySearch.length === 0) {
      return [];
    }

    return categories.filter(filterBySearch).map((c) => ({
      label: (
        <Highlighter
          searchWords={[categorySearch]}
          autoEscape={true}
          textToHighlight={c.label}
        />
      ),
      value: c.id,
    }));
  }

  function handleChangeProduct(key: string, val: any): void {
    setProduct({ ...product, [key]: val });
  }

  function handleChangeImage(src?: string | null | undefined): void {
    setProduct({ ...product, cover: undefined, blob: src || undefined });
  }

  function handleAddCategory(id: string): void {
    setProduct({
      ...product,
      category: categories.find((c) => c.id === id),
    });

    setCategorySearch("");
  }

  function handleRemoveCategory(): void {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: (
        <Typography>Deseja realmente remover esta categoria?</Typography>
      ),
      cancelText: "Cancelar",
      onOk: () => {
        setProduct({
          ...product,
          category: undefined,
        });
      },
    });
  }

  function handleChangeUnlimited(unlimited: boolean): void {
    const data: any = { unlimited };
    if (unlimited) {
      data.quantity = 1;
    }

    setProduct({ ...product, ...data });
  }

  function handleSubmit(): void {
    formHandler.validateFields().then(() => onSave(product));
  }

  return (
    <Modal
      open={Boolean(props.product)}
      onCancel={onClose}
      title={product.id ? "Editar produto" : "Criar produto"}
      footer={null}
    >
      <CardCustom
        style={{ margin: 5 }}
        cover={
          <ImageCrop
            src={product.cover || product.blob}
            onChange={handleChangeImage}
          />
        }
      >
        <Form form={formHandler}>
          <Form.Item
            label="Nome"
            name="label"
            rules={[{ required: true, message: "Informe um nome válido" }]}
            initialValue={product.label}
          >
            <Input
              size="large"
              value={product.label}
              autoComplete="off"
              onChange={(e) =>
                handleChangeProduct("label", e.target.value || "")
              }
            />
          </Form.Item>

            <ReactQuill theme="snow" value={product.description} onChange={(d) => handleChangeProduct("description", d || '')} />
          <div style={{ textAlign: "right", marginBottom: 15 }}>
            <Typography.Text disabled>
              {(product.description || "").length}/{2048}
            </Typography.Text>
          </div>
          <Form.Item
            label="Quantidade"
            name="quantity"
            rules={[{ required: true, message: "Informe a quantidade" }]}
            initialValue={product.quantity}
          >
            <Switch
              checkedChildren="Limitado"
              unCheckedChildren="Ilimitado"
              defaultChecked={!product.unlimited}
              onChange={(checked) => handleChangeUnlimited(!checked)}
            />
            &nbsp;
            {!product.unlimited && (
              <InputNumber
                size="large"
                value={product.quantity}
                min={1}
                step={1}
                onChange={(val) => handleChangeProduct("quantity", val)}
              />
            )}
          </Form.Item>
          <Form.Item
            label="Preço"
            name="price"
            rules={[{ required: true, message: "Informe um preço válido" }]}
            initialValue={product.price}
          >
            <Currency
              cents={product.price}
              onChange={(cents) => handleChangeProduct("price", cents)}
              placeholder="R$ 1,00"
            />
          </Form.Item>
          <Form.Item
            label="Categorias"
            name="category"
            rules={[
              {
                validator() {
                  if (product.category) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Informe uma categoria.');
                },
              },
            ]}>
            <AutoComplete
              disabled={Boolean(product.category)}
              options={getCategoryOptions()}
              onSelect={(val) => handleAddCategory(val)}
              onSearch={setCategorySearch}
              value={categorySearch}
            >
              <Input.Search placeholder="Categorias" />
            </AutoComplete>
            {product.category && (
              <div style={{ marginTop: 10, marginBottom: 25 }}>
                <Tag
                  style={{ cursor: "pointer" }}
                  icon={<CloseCircleOutlined />}
                  onClick={() => handleRemoveCategory()}
                >
                  {product.category.label}
                </Tag>
              </div>
            )}
          </Form.Item>
          <div>
            <Button type="primary" size="large" onClick={handleSubmit}>
              {product.id ? "Salvar" : "Criar"}
            </Button>
          </div>
        </Form>
      </CardCustom>
    </Modal>
  );
}
