import { createSlice } from '@reduxjs/toolkit'
import { PositionsData } from './positionsSlice'

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
    userShopCart: PositionsData
}

const initialState = {
    isAutorized: false,
    userKey: null,
    userData: null,
    favoritePosition: [],
    userShopCart: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
            state.isAutorized = true
        },
    },
})

const { actions, reducer } = userSlice
export default reducer
export const { setUserData } = actions
