import { createSlice } from '@reduxjs/toolkit'

export interface Position {
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

export type PositionsData = Position[]

export interface positionsSliceInitialState {
    positions: PositionsData
    sortType: FilterType
    quantityPositionsOnPage: QuantityType
    positionsType: 'card' | 'line'
    positionsOffset: number
}

const initialState: positionsSliceInitialState = {
    positions: [],
    sortType: {
        descr: 'Популярные',
        type: 'popular',
    },
    quantityPositionsOnPage: 15,
    positionsType: 'card',
    positionsOffset: 0,
}

const positionsSlice = createSlice({
    name: 'positions',
    initialState,
    reducers: {
        setPositions: (state, action) => {
            state.positions = action.payload
        },
        setPositionsType: (state, action) => {
            state.positionsType = action.payload
        },
        setPositionsSortType: (state, action) => {
            state.sortType = action.payload
        },
        setQuantityPositionsOnPage: (state, action) => {
            state.quantityPositionsOnPage = action.payload
        },
    },
})

const { actions, reducer } = positionsSlice
export default reducer
export const {
    setPositions,
    setPositionsType,
    setPositionsSortType,
    setQuantityPositionsOnPage,
} = actions
