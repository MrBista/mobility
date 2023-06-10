import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../features/counter/counterSlice';
import { mobilityApi } from '../services/MOBILITYAPI.JS';
import { setupListeners } from '@reduxjs/toolkit/query';
import productSlice from '../features/product/productSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    [mobilityApi.reducerPath]: mobilityApi.reducer,
    product: productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mobilityApi.middleware),
});

setupListeners(store.dispatch);
