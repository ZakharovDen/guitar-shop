import { Product } from '../../types/product';
import { ProductsWithPagination } from '../../types/products-with-pagination';
import { State } from '../../types/state';
import { NameSpace } from '../const';

export const getProducts = (state: State): ProductsWithPagination => state[NameSpace.Products].products;
export const getProductsDataLoadingStatus = (state: State): boolean => state[NameSpace.Products].isProductsDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Products].hasError;
export const getProductInfo = (state: State): Product | undefined => state[NameSpace.Products].productInfo;
