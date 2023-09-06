import { ICategory } from "@/interfaces";
import { List, Typography } from "antd";
import { CategoryListItem } from "./Item";

interface CategoryListProps {
  categories: ICategory[];
  onEdit: (category: ICategory) => void;
  onRemove: (category: ICategory) => void;
}

export function CategoryList(props: CategoryListProps) {
  const { categories, onEdit, onRemove } = props;
  return (
    <List size="small">
      {categories.map((item: ICategory, index: number) =>
        <CategoryListItem
          key={index}
          category={item}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      )}
    </List>
  );
}