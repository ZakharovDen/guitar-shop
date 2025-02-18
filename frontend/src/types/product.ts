export type Product = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  photoPath: string;
  type: string;
  article: string;
  stringsCount: number;
  price: number;
}

export type Products = Product[];