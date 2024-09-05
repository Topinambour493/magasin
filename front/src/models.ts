import {rename} from "node:fs";

export type Product = {
  name: string;
  description: string;
  stock: number;
  price: number
  _id?: string;
}


export type ProductEdit =
  Product &
  {
    onDelete: (id: string) => void,
    onEdit: (product: Product) => void;
  }

