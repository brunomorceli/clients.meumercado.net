import { ReactNode } from "react";
import {v4 as Uuid} from 'uuid';

export interface IAttribute {
  id: string;
  label: string;
  value?: ReactNode | any | null | undefined;
}

export class IAttributeHandler {
  static empty(): IAttribute {
    return {
      id: Uuid(),
      label: '',
      value: '',
    };
  }
}
