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

type ProductWithoutId = Omit<Product, 'id'>;

export type NewProduct = Partial<Pick<Product, 'id'>> & ProductWithoutId & { photo?: File };

export type Products = Product[];