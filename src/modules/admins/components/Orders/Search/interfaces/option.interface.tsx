import { ReactNode } from "react";
import { EField } from "../enums";

export interface IOption {
  icon?: ReactNode | undefined | null;
  label?: string;
  field: EField;
  search: string;
}