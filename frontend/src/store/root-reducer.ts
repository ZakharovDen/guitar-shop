import { combineReducers } from '@reduxjs/toolkit';
import { user } from './user/user';
import { NameSpace } from './const';
import { products } from './products/products';

export const rootReducer = combineReducers({
  [NameSpace.User]: user.reducer,
  [NameSpace.Products]: products.reducer,
});
