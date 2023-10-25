import { Item } from "./Item";
import { IOption } from "./interfaces/option.interface";

interface WebCategoriesProps {
  options: IOption[];
  onPick: (value: string) => void;
}

export function Categories(props: WebCategoriesProps) {
  return (
    <>
      {props.options.map((option, index) => (
        <Item key={index} option={option} onPick={props.onPick} firstLayer />
      ))}
    </>
  );
}
