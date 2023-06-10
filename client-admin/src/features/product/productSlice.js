import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  formEdit: {
    name: '',
    mainImg: '',
    price: '',
    categoryId: '1',
    description: '',
    images: '',
  },
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    doEditProduct: (state, action) => {
      state.formEdit = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { doEditProduct } = productSlice.actions;

export default productSlice.reducer;
