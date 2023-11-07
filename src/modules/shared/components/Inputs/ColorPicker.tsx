import { ColorUtils } from "@root/modules/shared";
import { CirclePicker } from "react-color";

interface ColorPickerProps {
  color: string;
  colors?: string[];
  onChange: (color: string) => void;
}

export function ColorPicker(props: ColorPickerProps) {
  return (
    <div style={{ backgroundColor: '#f1f1f1', padding: 20, marginTop: 10, borderRadius: 5 }}>
      <CirclePicker
        width="100%"
        colors={props.colors}
        onChange={(color) => props.onChange(color.hex)}
        color={props.color}
      />
    </div>
  );
}
