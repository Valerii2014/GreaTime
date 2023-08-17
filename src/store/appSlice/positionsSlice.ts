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
    randomPositions: PositionsData
    sortType: FilterType
    quantityPositionsOnPage: QuantityType
    positionsType: 'card' | 'line'
    positionsOffset: number
}

const initialState: positionsSliceInitialState = {
    positions: [],
    randomPositions: [],
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
        setRandomPositions: (state, action) => {
            state.randomPositions = action.payload
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
        setPositionsOffset: (state, action) => {
            if (action.payload < 0) return
            else if (action.payload > state.positions.length - 1) return
            else state.positionsOffset = action.payload
        },
    },
})

const { actions, reducer } = positionsSlice
export default reducer
export const {
    setPositionsOffset,
    setPositions,
    setRandomPositions,
    setPositionsType,
    setPositionsSortType,
    setQuantityPositionsOnPage,
} = actions
