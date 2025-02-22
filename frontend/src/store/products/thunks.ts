import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { APIRoute } from '../const';
import { Product } from '../../types/product';
import { ProductsWithPagination } from '../../types/products-with-pagination';
import { QueryParams } from '../../types/query-params';

export const fetchProductsAction = createAsyncThunk<ProductsWithPagination, any, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProducts',
  async ({ page, sortBy, sortOrder, guitarStrings, guitarTypes }: QueryParams, { extra: api }) => {
    let query = '';
    if (page) {
      query += `&page=${page}`;
    }
    if (sortBy) {
      query += `&sortField=${sortBy}`;
    }
    if (sortOrder) {
      query += `&sortDirection=${sortOrder}`;
    }
    if (guitarTypes) {
      for (const type of guitarTypes) {
        query += `&guitarType=${type}`;
      }
    }
    if (guitarStrings) {
      for (const string of guitarStrings) {
        query += `&guitarStringsCount=${string}`;
      }
    }
    const result = await api.get<ProductsWithPagination>(`${APIRoute.Products}?${query}`);
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
