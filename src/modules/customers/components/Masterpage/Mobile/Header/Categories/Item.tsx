import { Nav } from "rsuite";
import { IOption } from "./interfaces/option.interface";
import { CustomNavItem, CustomNavMenu } from "./styles";

interface ItemProps {
  option: IOption;
  onPick: (value: string) => void;
  layer?: number;
}

export function Item(props: ItemProps) {
  const { option, onPick } = props;
  const layerDistance = 10;
  const layer = props.layer || 0;
  if (!option.children || option.children.length === 0) {
    return (
      <CustomNavItem style={{ marginLeft: layer * layerDistance}} onSelect={() => onPick(option.value)}>{option.label}</CustomNavItem>
    );
  }

  return (
    <CustomNavMenu style={{ marginLeft: layer * 5}} title={option.label} placement="topStart">
      <CustomNavItem style={{ marginLeft: (layer + 1) * layerDistance}} onSelect={() => onPick(option.value)}>Tudo de {option.label}</CustomNavItem>
      {(option.children || []).map((item: any, index: number) => (
        <Item option={item} key={index} onPick={onPick} layer={layer + 1} />
      ))}
    </CustomNavMenu>
  );
}
