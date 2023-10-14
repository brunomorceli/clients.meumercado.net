import { EField } from "../enums";

export interface IOption {
  label?: string;
  field: EField;
  search: string;
}