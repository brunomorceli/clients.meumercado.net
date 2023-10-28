import { ColorUtils } from "@root/modules/shared";
import { CirclePicker } from "react-color";

interface ColorPickerProps {
  color: string;
  colors?: string[];
  onChange: (color: string) => void;
}

export function ColorPicker(props: ColorPickerProps) {
  return (
    <div style={{ backgroundColor: '#e3e3e3', padding: 20 }}>
      <CirclePicker
        width="100%"
        colors={props.colors || ColorUtils.getColors()}
        onChange={(color) => props.onChange(color.hex)}
        color={props.color}
      />
    </div>
  );
}