import { Nav } from "rsuite";

interface AppbarCategoryProps {
  item: any;
  onPick: (id: string) => void;
}

export function AppbarCategory(props: AppbarCategoryProps) {
  if (!props.item.children || props.item.children.length === 0) {
    return (
      <Nav.Item onSelect={() => props.onPick(props.item.value)}>
        {props.item.label}
      </Nav.Item>
    );
  }

  return (
    <>
      <Nav.Menu title={props.item.label || ""}>
        <Nav.Item onSelect={() => props.onPick(props.item.value)}>
          Todos
        </Nav.Item>
        {(props.item.children || []).map((item: any, index: number) => (
          <AppbarCategory item={item} key={index} onPick={props.onPick} />
        ))}
      </Nav.Menu>
    </>
  );
}
