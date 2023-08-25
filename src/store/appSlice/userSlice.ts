import { createSlice } from '@reduxjs/toolkit'
import { PositionsData, Position } from './positionsSlice'

export interface UserDataInterface {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    password: string
}

export interface UserSliceInitialStateInterface {
    isAutorized: boolean
    userKey: string | null
    userData: UserDataInterface | null
    favoritePosition: PositionsData
    shopCart: [string, number][]
}

const initialState: UserSliceInitialStateInterface = {
    isAutorized: false,
    userKey: null,
    userData: null,
    favoritePosition: [],
    shopCart: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
            state.isAutorized = true
        },
        addProductToShopCart: (state, action) => {
            let isContain = false
            for (const product of state.shopCart) {
                if (product[0] === action.payload) {
                    product[1]++
                    isContain = true
                }
            }
            if (!isContain) state.shopCart.push([action.payload, 1])
        },
        delProductFromShopCart: (
            state,
            action: { type: string; payload: string }
        ) => {
            state.shopCart.forEach((product) => {
                if (product[0] === action.payload) {
                    const newQuantity = product[1] - 1
                    if (newQuantity > 0) product[1] = newQuantity
                }
            })
        },
        setProductQuantityInCart: (state, action) => {
            for (const product of state.shopCart) {
                if (product[0] === action.payload.productId) {
                    product[1] = action.payload.newQuantity
                }
            }
        },
    },
})

const { actions, reducer } = userSlice
export default reducer
export const {
    setUserData,
    addProductToShopCart,
    delProductFromShopCart,
    setProductQuantityInCart,
} = actions
