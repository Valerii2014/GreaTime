import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import hostName from './.node-host'

export interface subcatDataInterface {
    _id: string
    name: string
    positions: []
    categoryFather: string
}

export interface categoryDataInterface {
    _id: string
    subcat?: string[]
    name: string
    img: string
    subcatData?: subcatDataInterface[]
    positions?: []
}

export type CategoryData = categoryDataInterface[]
interface sliderDataInterface {
    _id: string
    src: string
    alt: string
}
export type SliderData = sliderDataInterface[]

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi ',
    baseQuery: fetchBaseQuery({ baseUrl: `${hostName}/categories` }),
    endpoints: (builder) => ({
        getAllCategories: builder.query<Array<categoryDataInterface>, void>({
            query: () => '',
        }),
        getSliderData: builder.query<Array<sliderDataInterface>, void>({
            query: () => '/slider-data',
        }),
    }),
})

export const { useGetAllCategoriesQuery, useGetSliderDataQuery } = categoriesApi
