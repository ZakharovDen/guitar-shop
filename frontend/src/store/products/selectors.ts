import { Product, Products } from '../../types/product';
import { State } from '../../types/state';
import { NameSpace } from '../const';

export const getProducts = (state: State): Products => state[NameSpace.Products].products;
export const getProductsDataLoadingStatus = (state: State): boolean => state[NameSpace.Products].isProductsDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Products].hasError;
export const getProductInfo = (state: State): Product | undefined => state[NameSpace.Products].productInfo;
