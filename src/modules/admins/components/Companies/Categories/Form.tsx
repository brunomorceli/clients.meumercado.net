import { Dropdown, IconButton, Modal, Tree } from "rsuite";
import { useState } from "react";
import { v4 as Uuild } from "uuid";
import PlusIcon from "@rsuite/icons/Plus";
import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";
import { ItemDataType } from "rsuite/esm/@types/common";
import { InputText, PanelBase } from "@shared/components";
import MoreIcon from '@rsuite/icons/More';
import { ConfirmModal, FormModal } from "@shared/components";

export interface CustomItemDataType extends ItemDataType {
  edit?: boolean;
}

interface CategoryFormProps {
  categories: CustomItemDataType[];
  onChange: (items: CustomItemDataType[]) => void;
}

export function CategoryForm(props: CategoryFormProps) {
  const [categoryForm, setCategoryForm] = useState<CustomItemDataType | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [categoryDeleteTarget, seteCategoryDeleteTarget] = useState<CustomItemDataType | null>(null);

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
    const newList = [...expandedCategories];
    const index = newList.indexOf(value);
    if (index !== -1) {
      newList.splice(index, 1);
    } else {
      newList.push(value);
    }

    setExpandedCategories(newList);
  }

  function expandItem(value: string): void {
    const index = expandedCategories.indexOf(value);
    if (index !== -1) {
      return;
    }
    setExpandedCategories([...expandedCategories, value]);
  }

  function handleAddItem(parentNode: CustomItemDataType): void {
    const newData = [...props.categories];

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

    props.onChange(newData);
    setCategoryForm(null);
    expandItem(parentNode.value as string);

    props.onChange(newData);
  }

  function handleEditItem(node: CustomItemDataType): void {
    const newData = [...props.categories];

    iterateItems(newData, (item) => {
      if (item.value === node.value) {
        item.label = node.label;
      }
    });

    props.onChange(newData);
    setCategoryForm(null);
    props.onChange(newData);
  }

  function handleRemoveItem(node: any): void {
    const newData = [...props.categories];
    iterateItems(newData, (item, parent, index) => {
      if (item.value === node.value) {
        if (!parent) {
          newData.splice(index, 1);
        } else {
          parent.children.splice(index, 1);
        }
      }
    });

    setExpandedCategories([...expandedCategories.filter((i) => i !== node.value)]);
    props.onChange(newData);

    seteCategoryDeleteTarget(null);
  }

  return (
    <>
      <PanelBase
        title="Categorias"
        onAdd={() => setCategoryForm({ label: "", children: [] })}
      >
        <Tree
          data={props.categories}
          draggable
          showIndentLine={true}
          expandItemValues={expandedCategories}
          onSelect={(e) => toggleExpandedItem(e.value as string)}
          onDrop={(dropData) =>
            props.onChange(dropData.createUpdateDataFunction(props.categories))
          }
          renderTreeNode={(node) => (
            <>
              {node.label} ({(node.children || []).length}) &nbsp;
              <Dropdown
                renderToggle={(props, ref) => (
                  <IconButton
                    {...props}
                    ref={ref}
                    icon={<MoreIcon style={{ transform: 'rotate(90deg);'}} />}
                    circle
                    size="xs"
                  />
                )}
              >
                <Dropdown.Item
                  icon={<PlusIcon />}
                  onClick={() => setCategoryForm({ ...node, label: "" })}
                >
                  Adicionar Subcategoria
                </Dropdown.Item>
                <Dropdown.Item
                  icon={<EditIcon />}
                  onClick={() => setCategoryForm({ ...node, edit: true })}
                >
                  Editar Subcategoria
                </Dropdown.Item>
                <Dropdown.Item
                  icon={<TrashIcon />}
                  onClick={() => seteCategoryDeleteTarget(node)}
                >
                  Excluir Categoria
                </Dropdown.Item>
              </Dropdown>
            </>
          )}
        />
      </PanelBase>

      <ConfirmModal
        open={Boolean(categoryDeleteTarget)}
        title="Remover Categoria"
        onClose={() => seteCategoryDeleteTarget(null)}
        onConfirm={() => handleRemoveItem(categoryDeleteTarget)}
      >
        Deseja realmente remover <strong>{categoryDeleteTarget?.label}</strong>?
      </ConfirmModal>

      <FormModal
        open={Boolean(categoryForm)}
        title={"Categoria"}
        onClose={() => setCategoryForm(null)}
        onSave={() =>
          categoryForm?.edit
            ? handleEditItem(categoryForm as CustomItemDataType)
            : handleAddItem(categoryForm as CustomItemDataType)
        }
      >
        <InputText
          label="Nome"
          value={categoryForm?.label as string}
          onChange={(label) => setCategoryForm({ ...categoryForm || {}, label })}
        />
      </FormModal>
    </>
  );
}
