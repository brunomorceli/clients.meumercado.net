import { Dropdown } from "rsuite";
import { Category } from "./styles";
import { IOption } from "./interfaces/option.interface";
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';

interface ItemProps {
  option: IOption;
  firstLayer?: boolean;
  onPick: (value: string) => void;
}

export function Item(props: ItemProps) {
  const { option, firstLayer, onPick } = props;
  if (!option.children || option.children.length === 0) {
    return firstLayer ? (
      <Category onClick={() => onPick(option.value)}>{option.label}</Category>
    ) : (
      <Dropdown.Item onSelect={() => onPick(option.value)}>
        {option.label}
      </Dropdown.Item>
    );
  }

  return (
    <>
      <Dropdown
        appearance="subtle"
        title={firstLayer ? undefined : option.label}
        trigger="hover"
        placement={firstLayer ? 'bottomStart' : 'rightStart'}
        renderToggle={
          firstLayer ? () => <Category>{option.label} <ArrowDownLineIcon /></Category> : undefined
        }
      >
        <Dropdown.Item onSelect={() => onPick(option.value)}>
          {`Ver tudo em ${option.label}`}
        </Dropdown.Item>
        {(option.children || []).map((item: any, index: number) => (
          <Item option={item} key={index} onPick={onPick} />
        ))}
      </Dropdown>
    </>
  );
}
