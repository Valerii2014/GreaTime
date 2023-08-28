import { createSlice } from '@reduxjs/toolkit'
import { ProductsData, Product } from './productsSlice'

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
    favoriteProduct: ProductsData
    shopCart: [string, number][]
}

const initialState: UserSliceInitialStateInterface = {
    isAutorized: false,
    userKey: null,
    userData: null,
    favoriteProduct: [],
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
                    if (newQuantity >= 0) product[1] = newQuantity
                }
            })
        },
        setProductQuantityInCart: (state, action) => {
            const { _id, quantity } = action.payload
            console.log(_id, quantity)
            for (const product of state.shopCart) {
                if (product[0] === _id) {
                    product[1] = quantity
                }
            }
        },
        removeProduct: (state, action) => {
            state.shopCart = state.shopCart.filter(
                (product) => product[0] !== action.payload
            )
        },
        clearShopCart: (state) => {
            state.shopCart = []
        },
    },
})

const { actions, reducer } = userSlice
export default reducer
export const {
    setUserData,
    clearShopCart,
    removeProduct,
    addProductToShopCart,
    delProductFromShopCart,
    setProductQuantityInCart,
} = actions
