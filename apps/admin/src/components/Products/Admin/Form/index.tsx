import { ICategory, IProduct, IProductHandler } from "@/interfaces";
import Highlighter from "react-highlight-words";
import {
  AutoComplete,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Tag,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { CardCustom } from "./styles";
import { ImageCrop } from "@/components/ImageCrop";
import { Currency } from "@/components";
import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

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
    const data: any = props.product || IProductHandler.getEmptyProduct()
    setProduct(data);

    Object.keys(data).forEach((key) => {
      formHandler.setFieldValue(key, data[key]);
    });

    !props.product && setCategorySearch('');
  }, [formHandler, props.product]);

  function filterPickedCategories(category: ICategory): boolean {
    return !product.categories.some((id) => id === category.id);
  }

  function filterBySearch(category: ICategory): boolean {
    const target = categorySearch.toLocaleLowerCase();
    return category.label.toLocaleLowerCase().indexOf(target) !== -1;
  }

  function getCategoryOptions(): any {
    if (categorySearch.length === 0) {
      return [];
    }

    return categories
      .filter(filterBySearch)
      .filter(filterPickedCategories)
      .map((c) => ({
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
      categories: [...product.categories, id],
    });

    setCategorySearch("");
  }

  function handleRemoveCategory(id: string): void {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: (
        <Typography>Deseja realmente remover esta categoria?</Typography>
      ),
      cancelText: "Cancelar",
      onOk: () => {
        setProduct({
          ...product,
          categories: product.categories.filter((catId) => catId !== id),
        });
      },
    });
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
          <Form.Item
            label="Descrição"
            name="description"
            style={{ marginBottom: 0 }}
            initialValue={product.description}
          >
            <Input.TextArea
              size="large"
              rows={5}
              maxLength={2048}
              value={product.label}
              onChange={(e) =>
                handleChangeProduct("description", e.target.value || "")
              }
            />
          </Form.Item>
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
            <InputNumber
              size="large"
              value={product.quantity}
              min={1}
              step={1}
              onChange={(val) => handleChangeProduct("quantity", val)}
            />
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
          <Form.Item label="Categorias">
            <AutoComplete
              options={getCategoryOptions()}
              onSelect={(val) => handleAddCategory(val)}
              onSearch={setCategorySearch}
              value={categorySearch}
            >
              <Input.Search placeholder="Categorias" />
            </AutoComplete>
          </Form.Item>
          <div style={{ marginBottom: 25 }}>
            {categories
              .filter((c) => product.categories.includes(c.id!))
              .map((item, index) => (
                <Tag
                  key={index}
                  icon={<CloseCircleOutlined />}
                  onClick={() => handleRemoveCategory(item.id!)}
                >
                  {item.label}
                </Tag>
              ))}
          </div>
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
