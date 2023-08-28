import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product } from '../store/appSlice/productsSlice'
import hostName from './.node-host'

export const productsApi = createApi({
    reducerPath: 'productsApi ',
    baseQuery: fetchBaseQuery({ baseUrl: `${hostName}/products` }),
    endpoints: (builder) => ({
        getSubcatsProducts: builder.query<Array<Product>, string[]>({
            query: (idsArray) => `fromsubcats/${idsArray.join(';')}`,
        }),
        getRandomProducts: builder.query<Array<Product>, number>({
            query: (quantityProducts) => `random/${quantityProducts}`,
        }),
        getProductWithName: builder.query<Array<Product>, string>({
            query: (productName) => `find/${productName}`,
        }),
        getProductWithId: builder.query<Array<Product>, string[]>({
            query: (productIds) => `${productIds.join(';')}`,
        }),
    }),
})

export const {
    useGetSubcatsProductsQuery,
    useGetRandomProductsQuery,
    useGetProductWithNameQuery,
    useGetProductWithIdQuery,
} = productsApi
