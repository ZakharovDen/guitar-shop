import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { APIRoute } from '../const';
import { Product, Products } from '../../types/product';
import { ProductsWithPagination } from '../../types/products-with-pagination';

export const fetchProductsAction = createAsyncThunk<Products, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProducts',
  async (_arg, { extra: api }) => {
    const result = await api.get<ProductsWithPagination>(APIRoute.Products);
    return result.data.entities;
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
