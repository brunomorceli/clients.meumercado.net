import { ICategory } from "@/interfaces";
import { ColorUtils } from "@/utils";
import { Button, Card, ColorPicker, Form, Input } from "antd";
import { useEffect, useState } from "react";

interface CategoryFormProps {
  category?: ICategory | null;
  onSubmit: (data: ICategory) => void;
}
export function CategoryForm(props: CategoryFormProps) {
  const [category, setCategory] = useState<ICategory>({
    label: '',
    color: ColorUtils.getRandomColor(),
  });
  const [formHandler] = Form.useForm();

  useEffect(() => {
    if (props.category) {
      formHandler.setFieldsValue(props.category);
      setCategory(props.category);
    }
  }, [props.category, formHandler]);

  function handleChangeForm(key: string, value: any): void {
    setCategory({ ...category, [key]: value });
  }

  function handleSubmit(): void {
    formHandler.validateFields().then(() => props.onSubmit(category));
  }

  return (
    <Card>
      <Form form={formHandler}>
        <Form.Item
          label="Nome"
          name="label"
          rules={[{ required: true, message: 'Informe um nome válido' }]}
        >
          <Input
            size="large"
            defaultValue={category.label}
            value={category.label}
            autoComplete="off"
            onChange={(e) => handleChangeForm("label", e.target.value || "")}
          />
        </Form.Item>
        <Form.Item label="Cor" name="color">
          <ColorPicker
            showText
            value={category.color}
            onChange={(e) => handleChangeForm("color", e.toHexString())}
          />
        </Form.Item>
        <div>
          <Button type="primary" size="large" onClick={handleSubmit}>
            {category.id ? 'Salvar' : 'Criar'}
          </Button>
        </div>
      </Form>
    </Card>
  );
}
