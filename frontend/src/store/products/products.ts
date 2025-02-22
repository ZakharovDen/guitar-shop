import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/product";
import { NameSpace } from "../const";
import { deleteProductAction, fetchProductsAction, getProductAction, postProductAction } from "./thunks";
import { ProductsWithPagination } from "../../types/products-with-pagination";

export type InitialState = {
  products: ProductsWithPagination;
  productInfo: Product | undefined;
  isProductsDataLoading: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  products: {
    currentPage: 1,
    entities: [],
    itemsPerPage: 7,
    totalItems: 0,
    totalPages: 0
  },
  productInfo: undefined,
  isProductsDataLoading: false,
  hasError: false,
};

export const products = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.isProductsDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isProductsDataLoading = false;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.isProductsDataLoading = false;
        state.hasError = true;
      })
      .addCase(getProductAction.pending, (state) => {
        state.isProductsDataLoading = true;
        state.hasError = false;
      })
      .addCase(getProductAction.fulfilled, (state, action) => {
        state.productInfo = action.payload;
        state.isProductsDataLoading = false;
      })
      .addCase(getProductAction.rejected, (state) => {
        state.isProductsDataLoading = false;
        state.hasError = true;
      })
      .addCase(deleteProductAction.pending, (state) => {
        state.isProductsDataLoading = true;
        state.hasError = false;
      })
      .addCase(deleteProductAction.fulfilled, (state, action) => {
        state.products.entities = state.products.entities.filter((product) => product.id !== action.payload);
        state.isProductsDataLoading = false;
      })
      .addCase(deleteProductAction.rejected, (state) => {
        state.isProductsDataLoading = false;
        state.hasError = true;
      })
      .addCase(postProductAction.pending, (state) => {
        state.isProductsDataLoading = true;
        state.hasError = false;
      })
      .addCase(postProductAction.fulfilled, (state, action) => {
        state.products.entities.push(action.payload);
        state.isProductsDataLoading = false;
      })
      .addCase(postProductAction.rejected, (state) => {
        state.isProductsDataLoading = false;
        state.hasError = true;
      })
  },
})