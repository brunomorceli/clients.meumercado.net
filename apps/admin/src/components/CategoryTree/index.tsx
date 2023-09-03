import { Button, Input, List, Modal, Typography, message } from "antd";
import { ListItem } from "../Categories/List/styles";
import { useState } from "react";
import { v4 as Uuid } from "uuid";
import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
  TagsOutlined,
} from "@ant-design/icons";

interface ICategory {
  parent?: ICategory;
  name: string;
  edition?: boolean;
  id: string;
  level: number;
  children: ICategory[];
}

interface CategoryItemProps {
  category: ICategory;
  path: ICategory[];
  onAdd: (category: ICategory) => void;
  onChange: (category: ICategory) => void;
  onRemove: (category: ICategory) => void;
}

function CategoryItem(props: CategoryItemProps) {
  const { category, path, onAdd, onChange, onRemove } = props;
  const marginLeft = (category.level || 0) * 20;
  const { name, edition } = category;

  return (
    <>
      <ListItem
        style={{ marginLeft }}
        actions={[
          <Button
            key="addBtn"
            type="text"
            size="large"
            onClick={() => onAdd(category)}
          >
            <PlusCircleOutlined />
          </Button>,
          <Button
            key="rmvBtn"
            type="text"
            size="large"
            onClick={() => onRemove(category)}
          >
            <CloseCircleOutlined />
          </Button>,
        ]}
      >
        {!edition ? (
          <Typography>
            <strong>
              <TagsOutlined />
              &nbsp;
              {[...path.map((c) => c.name)].join(" / ")}
            </strong>
          </Typography>
        ) : (
          <Input
            size="large"
            prefix={<TagsOutlined />}
            placeholder="Digite o nome da categoria..."
            value={name}
            onChange={(e) =>
              onChange({ ...category, name: e.target.value || "" })
            }
          />
        )}
      </ListItem>
      {category.children.map((item, index) => (
        <CategoryItem
          key={index}
          category={item}
          path={[...props.path, item]}
          onAdd={(i) => onAdd(i)}
          onChange={(i) => onChange(i)}
          onRemove={(i) => onRemove(i)}
        />
      ))}
    </>
  );
}

interface CategoriesProps {
  categories: ICategory[];
}

export function CategoryThree(props: CategoriesProps) {
  const [parent, setParent] = useState<ICategory>({
    id: Uuid(),
    children: props.categories,
    level: 0,
    name: "",
  });

  function iterateItems(
    category: ICategory,
    context: (item: ICategory) => void
  ) {
    context(category);

    for (let i in category.children) {
      iterateItems(category.children[i], context);
    }
  }

  function handleAddCategory(category: ICategory, unshift?: boolean): void {
    const newParent = { ...parent };

    iterateItems(newParent, (cat) => {
      if (cat.id === category.id) {
        cat.children[unshift ? "unshift" : "push"]({
          id: Uuid(),
          name: "",
          edition: true,
          children: [],
          parent: cat,
          level: cat.level + 1,
        });
      }
    });

    setParent(newParent);
  }

  function handleChangeCategory(category: ICategory): void {
    const newParent = { ...parent };

    iterateItems(newParent, (cat) => {
      if (cat.id === category.id) {
        cat.name = category.name;
      }
    });

    setParent(newParent);
  }

  function handleRemoveCategory(category: ICategory): void {
    const newParent = { ...parent };

    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: (
        <Typography>
          Deseja realmente remover esta categoria?
        </Typography>
      ),
      cancelText: "Cancelar",
      onOk: () => {

        iterateItems(newParent, (cat) => {
          if (cat.id === category.id) {

            const index: any = cat.parent?.children.findIndex((c) => c.id === cat.id);
            cat.parent!.children.splice(index, 1);
          }
        });
    
        setParent(newParent);
      },
    });
  }

  function handleSave(): void {
    const newParent = { ...parent };


    let isEmpty = false;
    iterateItems(newParent, (category) => {
      if (category.name === '' && category.id !== parent.id) {
        isEmpty = true;
      }
    });

    if (isEmpty) {
      message.error('É necessário informar o nome de todas as categorias.')
      return;
    }

    iterateItems(newParent, (category) => {
      category.edition = false;
    });

    setParent(newParent);
  }

  return (
    <List>
      Criar <Button onClick={() => handleAddCategory(parent)}>Add</Button>
      {parent.children.map((item, index) => (
        <CategoryItem
          key={index}
          category={item}
          path={[item]}
          onAdd={(category) => handleAddCategory(category)}
          onChange={(category) => handleChangeCategory(category)}
          onRemove={(category) => handleRemoveCategory(category)}
        />
      ))}
      <ListItem>
        <Button onClick={handleSave}>Salvar</Button>
      </ListItem>
    </List>
  );
}
