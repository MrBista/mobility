import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mobilityApi = createApi({
  reducerPath: 'mobilityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('access_token', `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Products', 'Categories', 'Product', 'Dashboard'],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userForm) => ({
        url: '/login',
        method: 'post',
        body: userForm,
      }),
    }),
    register: builder.mutation({
      query: (userForm) => ({
        url: '/register',
        method: 'post',
        body: userForm,
      }),
    }),

    // product
    getAllProduct: builder.query({
      query: () => ({
        url: '/',
        method: 'get',
      }),
      providesTags: (result, error, arg) => {
        // console.log(result[0].id, '<=== ini result');
        return result
          ? [
              { type: 'Products', id: 'LIST' },
              ...result.map(({ id }) => ({ type: 'Products', id })),
            ]
          : [{ type: 'Products', id: 'LIST' }];
      },
    }),

    deleteProduct: builder.mutation({
      query: ({ idProduct }) => ({
        url: `/${idProduct}`,
        method: 'delete',
      }),
      invalidatesTags: (result, err, arg) => {
        return [{ type: 'Products', id: arg.idProduct }, 'Dashboard'];
      },
    }),

    addProduct: builder.mutation({
      query: (productForm) => ({
        url: '/',
        method: 'post',
        body: productForm,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }, 'Dashboard'],
    }),
    updateProduct: builder.mutation({
      query: ({ productForm, idProduct }) => ({
        url: `/${idProduct}`,
        method: 'put',
        body: productForm,
      }),
      invalidatesTags: (result, err, arg) => {
        return [{ type: 'Products', id: arg.idProduct }, 'Product'];
      },
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `/${productId}`,
        method: 'get',
      }),
      providesTags: ['Product'],
    }),

    // category
    getAllCategory: builder.query({
      query: () => ({
        url: '/categories',
        method: 'get',
      }),
      providesTags: (result, error, arg) => {
        // console.log(result[0].id, '<=== ini result');
        return result
          ? [
              { type: 'Categories', id: 'LIST' },
              ...result.map(({ id }) => ({ type: 'Categories', id })),
            ]
          : [{ type: 'Categories', id: 'LIST' }];
      },
    }),
    getCategoryById: builder.query({
      query: (categoryId) => ({
        url: '/categories/' + categoryId,
        method: 'get',
      }),
    }),
    addCategory: builder.mutation({
      query: (formCategory) => ({
        url: '/categories',
        method: 'post',
        body: formCategory,
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }, 'Dashboard'],
    }),
    updateCategory: builder.mutation({
      query: ({ categoryForm, idCategory }) => ({
        url: `/categories/${idCategory}`,
        method: 'put',
        body: categoryForm,
      }),
      invalidatesTags: (result, err, arg) => {
        return [{ type: 'Categories', id: arg.idCategory }];
      },
    }),
    deleteCategory: builder.mutation({
      query: ({ idCategory }) => ({
        url: `/categories/${idCategory}`,
        method: 'delete',
      }),
      invalidatesTags: (result, err, arg) => {
        return [{ type: 'Categories', id: arg.idCategory }, 'Dashboard'];
      },
    }),

    getTotal: builder.query({
      query: () => '/totals',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetAllProductQuery,
  useDeleteProductMutation,
  useAddProductMutation,
  useGetAllCategoryQuery,
  useUpdateProductMutation,
  useAddCategoryMutation,
  useLazyGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useLazyGetProductByIdQuery,
  useDeleteCategoryMutation,
  useGetTotalQuery,
} = mobilityApi;
