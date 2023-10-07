import { Nav } from "rsuite";

interface AppbarCategoryProps {
  option: { label: string; value: any, children: any[] };
  onPick: (id: string) => void;
}

export function AppbarCategory(props: AppbarCategoryProps) {
  const { option, onPick } = props;
  const Item = (props: any) => (
    <Nav.Item onSelect={props.onSelect}>{props.title}</Nav.Item>
  );

  if (!option.children || option.children.length === 0) {
    return <Item onSelect={() => onPick(option.value)} title={option.label} />;
  }

  return (
    <>
      <Nav.Menu title={option.label || ""} trigger="hover">
        <Item
          onSelect={() => onPick(option.value)}
          title={`Ver tudo em ${option.label}`}
        />
        <Nav.Item onSelect={() => onPick(option.value)}>{option.label}</Nav.Item>
        {(option.children || []).map((item: any, index: number) => (
          <AppbarCategory option={item} key={index} onPick={onPick} />
        ))}
      </Nav.Menu>
    </>
  );
}
