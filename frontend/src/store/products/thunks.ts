import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { APIRoute } from '../const';
import { Product, Products } from '../../types/product';
import { ProductsWithPagination } from '../../types/products-with-pagination';
import { QueryParams } from '../../types/query-params';

// export const fetchProductsAction = createAsyncThunk<Products, any, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'data/fetchProducts',
//   async (query: any, { extra: api }) => {
//     let queryParams = '';
//     if (query?.page) {
//       queryParams = `?page=${query.page}`;
//     }
//     const result = await api.get<ProductsWithPagination>(`${APIRoute.Products}${queryParams}`);
//     return result.data.entities;
//   },
// );

export const fetchProductsAction = createAsyncThunk<ProductsWithPagination, any, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProducts',
  async (query: QueryParams, { extra: api }) => {
    let queryParams = '';
    if (query?.page) {
      queryParams = queryParams ? `${queryParams}&page=${query.page}` : `page=${query.page}`;
    }
    if (query?.sortBy) {
      queryParams = queryParams ? `${queryParams}&sortField=${query.sortBy}` : `sortField=${query.sortBy}`;
    }
    if (query?.sortOrder) {
      queryParams = queryParams ? `${queryParams}&sortDirection=${query.sortOrder}` : `sortDirection=${query.sortOrder}`;
    }
    const result = await api.get<ProductsWithPagination>(`${APIRoute.Products}${queryParams ? `?${queryParams}` : ''}`);
    return result.data;
  },
);

export const getProductAction = createAsyncThunk<Product, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getProduct',
  async (id, { extra: api }) => {
    const { data } = await api.get<Product>(`${APIRoute.Products}/${id}`);
    return data;
  },
);

export const deleteProductAction = createAsyncThunk<string, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/deleteProduct',
  async (id, { extra: api }) => {
    await api.delete<void>(`${APIRoute.Products}/${id}`);
    return id;
  },
);

export const postProductAction = createAsyncThunk<Product, FormData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postProduct',
  async (formData, { extra: api }) => {
    const { data } = await api.post<Product>(`${APIRoute.Products}`, formData);
    return data;
  },
);
