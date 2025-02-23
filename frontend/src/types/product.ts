import { GuitarStringId, GuitarTypeId } from "../constant";

export type Product = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  photoPath: string;
  type: GuitarTypeId;
  article: string;
  stringsCount: GuitarStringId;
  price: number;
}

export type NewProduct = Product & { photo?: File };

export type Products = Product[];