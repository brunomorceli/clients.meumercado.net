import { EMeasureType } from "@/enums";
import { v4 as Uuid } from 'uuid';
import { ISelectOption } from ".";

export interface IMeasure {
  label: string;
  type: EMeasureType;
  unitText?: string;
  options: ISelectOption[];
  value?: any;
  required?: boolean;
  id: string;
}

export class IMeasureHandler {
  static empty(): IMeasure {
    return {
      label: '',
      type: EMeasureType.ANY,
      options: [],
      id: Uuid(),
    };
  }

  static getPatterns() {
    return [
      { id: Uuid(), label: 'Peso', type: EMeasureType.ANY, unitText: 'CM', options: [], },
      { id: Uuid(), label: 'Comprimento', type: EMeasureType.ANY, unitText: 'CM', options: [], },
      { id: Uuid(), label: 'Largura', type: EMeasureType.ANY, unitText: 'CM', options: [], },
      { id: Uuid(), label: 'Altura', type: EMeasureType.ANY, unitText: 'CM', options: [], },
      { id: Uuid(), label: 'Cor', type: EMeasureType.ANY, options: [
        { label: 'Azul', value: '#0000FF' },
        { label: 'Deep Sky Blue', value: '#00BFFF' },
        { label: 'Light Sky Blue', value: '#87CEFA' },
        { label: 'Preto', value: '#000000' },
        { label: 'Prata', value: '#C0C0C0' },
        { label: 'Cinza', value: '#303030' },
        { label: 'Branco', value: '#ffffff' },
        { label: 'Ciano', value: '#00FFFF' },
        { label: 'Verde Mar', value: '#2E8B57' },
        { label: 'Verde', value: '#00FF00' },
        { label: 'Dourado', value: '#DAA520' },
        { label: 'Indigo', value: '#4B0082' },
        { label: 'Púrpuro', value: '#A020F0' },
        { label: 'Rosa', value: '#FF1493' },
        { label: 'Carmesim', value: '#DC143C' },
        { label: 'Marrom', value: '#800000' },
        { label: 'Vermelho', value: '#FF0000' },
        { label: 'Laranja', value: '#FFA500' },
        { label: 'Amarelo', value: '#FFFF00' },
      ], },
    ];
  }

  static getProductDefault(): IMeasure[] {
    return [
      { id: Uuid(), label: 'Peso', type: EMeasureType.ANY, unitText: 'CM', options: [], },
      { id: Uuid(), label: 'Comprimento', type: EMeasureType.ANY, unitText: 'CM', options: [], },
      { id: Uuid(), label: 'Largura', type: EMeasureType.ANY, unitText: 'CM', options: [], },
      { id: Uuid(), label: 'Altura', type: EMeasureType.ANY, unitText: 'CM', options: [], },
    ];
  }
}
