import { Dropdown, IconButton, Tree } from "rsuite";
import { useState } from "react";
import { Typography, Card, Modal, Input, Button } from "antd";
import { v4 as Uuild } from "uuid";
import { ExclamationCircleOutlined, MoreOutlined } from "@ant-design/icons";
import PlusIcon from "@rsuite/icons/Plus";
import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";
import { ItemDataType } from "rsuite/esm/@types/common";

interface CustomItemDataType extends ItemDataType {
  edit?: boolean;
}

export default function CategorySelector() {
  const [nodeForm, setNodeForm] = useState<CustomItemDataType | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [items, setItems] = useState<CustomItemDataType[]>([]);

  function iterateItems(
    item: any,
    context: (item: any, parent: any | null, index: number) => void,
    parent: any = null,
    index = 0
  ) {
    const isArray = Array.isArray(item);
    let children: any[];
    if (isArray) {
      children = item;
    } else {
      context(item, parent, index);
      children = item.children || [];
    }

    for (let i = 0; i < children.length; i++) {
      iterateItems(children[i], context, isArray ? null : item, i);
    }
  }

  function toggleExpandedItem(value: string): void {
    const newList = [...expandedItems];
    const index = newList.indexOf(value);
    if (index !== -1) {
      newList.splice(index, 1);
    } else {
      newList.push(value);
    }

    setExpandedItems(newList);
  }

  function expandItem(value: string): void {
    const index = expandedItems.indexOf(value);
    if (index !== -1) {
      return;
    }
    setExpandedItems([...expandedItems, value]);
  }

  function handleAddItem(parentNode: CustomItemDataType): void {
    const newData = [...items];

    if (!parentNode.value) {
      newData.unshift({ ...parentNode, value: Uuild() });
    } else {
      iterateItems(newData, (item) => {
        if (item.value === parentNode.value) {
          item.children = item.children || [];
          item.children.unshift({
            label: parentNode.label,
            value: Uuild(),
            children: [],
          });
        }
      });
    }

    setItems(newData);
    setNodeForm(null);
    expandItem(parentNode.value as string);
  }

  function handleEditItem(node: CustomItemDataType): void {
    const newData = [...items];

    iterateItems(newData, (item) => {
      if (item.value === node.value) {
        item.label = node.label;
      }
    });

    setItems(newData);
    setNodeForm(null);
  }

  function handleRemoveItem(node: any): void {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: (
        <Typography>
          Deseja realmente remover <b>{node.label}</b>?
        </Typography>
      ),
      cancelText: "Cancelar",
      onOk: () => {
        const newData = [...items];
        iterateItems(newData, (item, parent, index) => {
          if (item.value === node.value) {
            if (!parent) {
              newData.splice(index, 1);
            } else {
              parent.children.splice(index, 1);
            }
          }
        });

        setExpandedItems([...expandedItems.filter((i) => i !== node.value)]);
        setItems(newData);
      },
    });
  }

  return (
    <>
      <Card
        title={<Typography>Categorias </Typography>}
        extra={[
          <Button
            key="btnAdd"
            onClick={() => setNodeForm({ label: "", children: [] })}
          >
            <PlusIcon />
          </Button>,
        ]}
      >
        <Tree
          data={items}
          draggable
          showIndentLine={true}
          expandItemValues={expandedItems}
          onSelect={(e) => toggleExpandedItem(e.value as string)}
          onDrop={(dropData) =>
            setItems(dropData.createUpdateDataFunction(items))
          }
          renderTreeNode={(node) => (
            <>
              {node.label} ({(node.children || []).length}) &nbsp;
              <Dropdown
                renderToggle={(props, ref) => (
                  <IconButton
                    {...props}
                    ref={ref}
                    icon={<MoreOutlined />}
                    circle
                    size="xs"
                  />
                )}
              >
                <Dropdown.Item
                  icon={<PlusIcon />}
                  onClick={() => setNodeForm({ ...node, label: "" })}
                >
                  Adicionar Subcategoria
                </Dropdown.Item>
                <Dropdown.Item
                  icon={<EditIcon />}
                  onClick={() => setNodeForm({ ...node, edit: true })}
                >
                  Editar Subcategoria
                </Dropdown.Item>
                <Dropdown.Item
                  icon={<TrashIcon />}
                  onClick={() => handleRemoveItem(node)}
                >
                  Excluir Categoria
                </Dropdown.Item>
              </Dropdown>
            </>
          )}
        />
      </Card>
      <Modal
        open={Boolean(nodeForm)}
        onCancel={() => setNodeForm(null)}
        onOk={() =>
          nodeForm?.edit
            ? handleEditItem(nodeForm as CustomItemDataType)
            : handleAddItem(nodeForm as CustomItemDataType)
        }
        title="Categoria"
      >
        {nodeForm && (
          <Input
            value={nodeForm.label as string}
            onChange={(e) =>
              setNodeForm({ ...nodeForm, label: e.target.value || "" })
            }
          />
        )}
      </Modal>
    </>
  );
}