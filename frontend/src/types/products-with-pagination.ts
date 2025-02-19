import { Products } from "./product";

export type ProductsWithPagination = {
  entities: Products;
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}