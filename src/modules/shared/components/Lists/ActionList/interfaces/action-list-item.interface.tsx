import { ReactNode } from "react";

export interface IActionListItem {
  primary: string | ReactNode;
  secondary?: string | ReactNode | null | undefined;
  prefix?: ReactNode | null | undefined;
  icon?: any | null | undefined;
  value: any;
}