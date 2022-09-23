export interface ICard {
  id: string;
  name: string;
  img: string;
  brand: string;
  residue: string;
  frame: string;
  interface: Array<string>;
  color: string;
  caseSize: string;
  price: string;
  year: string;
  bestseller?: string;
}

export type FilterValue = {
  brand?: string[];
  caseSize?: string[];
  color?: string[];
  bestseller?: string[];
};

export type SortValue = {
  field?: string;
  direction?: string;
};

export type CartValues = {
  id?: string[];
}

export type RangeValues = {
  price?: string[];
  case?: string[];
};