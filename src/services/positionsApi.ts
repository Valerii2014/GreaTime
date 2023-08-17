import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Position } from '../store/appSlice/positionsSlice'

export const positionsApi = createApi({
    reducerPath: 'positionsApi ',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/positions/' }),
    endpoints: (builder) => ({
        getSubcatsPositions: builder.query<Array<Position>, string[]>({
            query: (idsArray) => `fromsubcats/${idsArray.join(';')}`,
        }),
        getRandomPositions: builder.query<Array<Position>, number>({
            query: (quantityProducts) => `random/${quantityProducts}`,
        }),
    }),
})

export const { useGetSubcatsPositionsQuery, useGetRandomPositionsQuery } =
    positionsApi
