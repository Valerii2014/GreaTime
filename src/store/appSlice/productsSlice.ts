import { createSlice } from '@reduxjs/toolkit'

export interface Product {
    _id: string
    name: string
    imgs: string[]
    rate: number
    descr: string
    price: number
    prevPrice: number
    categori: string
}

export type SortTypeLiteral =
    | 'less-more_price'
    | 'more-less_price'
    | 'popular'
    | 'with_sale'

export interface FilterType {
    descr: string
    type: SortTypeLiteral
}

export type QuantityType = 15 | 21 | 30 | 42

export type ProductsData = Product[]

export interface ProductsSliceInitialState {
    products: ProductsData
    randomProducts: ProductsData
    sortType: FilterType
    quantityProductsOnPage: QuantityType
    productsType: 'card' | 'line'
    productsOffset: number
}

const initialState: ProductsSliceInitialState = {
    products: [],
    randomProducts: [],
    sortType: {
        descr: 'Популярные',
        type: 'popular',
    },
    quantityProductsOnPage: 15,
    productsType: 'card',
    productsOffset: 0,
}

const productsSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setRandomProducts: (state, action) => {
            state.randomProducts = action.payload
        },
        setProductsType: (state, action) => {
            state.productsType = action.payload
        },
        setProductsSortType: (state, action) => {
            state.sortType = action.payload
        },
        setQuantityProductsOnPage: (state, action) => {
            state.quantityProductsOnPage = action.payload
        },
        setProductsOffset: (state, action) => {
            if (action.payload < 0) return
            else if (action.payload > state.products.length - 1) return
            else state.productsOffset = action.payload
        },
    },
})

const { actions, reducer } = productsSlice
export default reducer
export const {
    setProductsOffset,
    setProducts,
    setRandomProducts,
    setProductsType,
    setProductsSortType,
    setQuantityProductsOnPage,
} = actions
