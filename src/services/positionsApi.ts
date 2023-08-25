import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Position } from '../store/appSlice/positionsSlice'
import hostName from './.node-host'

export const positionsApi = createApi({
    reducerPath: 'positionsApi ',
    baseQuery: fetchBaseQuery({ baseUrl: `${hostName}/positions` }),
    endpoints: (builder) => ({
        getSubcatsPositions: builder.query<Array<Position>, string[]>({
            query: (idsArray) => `fromsubcats/${idsArray.join(';')}`,
        }),
        getRandomPositions: builder.query<Array<Position>, number>({
            query: (quantityProducts) => `random/${quantityProducts}`,
        }),
        getProductWithName: builder.query<Array<Position>, string>({
            query: (productName) => `find/${productName}`,
        }),
        getProductWithId: builder.query<Array<Position>, string[]>({
            query: (productIds) => `${productIds.join(';')}`,
        }),
    }),
})

export const {
    useGetSubcatsPositionsQuery,
    useGetRandomPositionsQuery,
    useGetProductWithNameQuery,
    useGetProductWithIdQuery,
} = positionsApi
