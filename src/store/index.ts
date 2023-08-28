import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { categoriesApi } from '../services/categoriesApi'
import { productsApi } from '../services/productsApi'
import { useSelector } from 'react-redux'
import categories from './appSlice/categoriesSlice'
import products from './appSlice/productsSlice'
import sliderAndModal from './appSlice/sliderAndModalSlice'
import user from './appSlice/userSlice'

const rootReducer = combineReducers({
    categories,
    products,
    sliderAndModal,
    user,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            categoriesApi.middleware,
            productsApi.middleware
        ),
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof rootReducer>

export const useAppSelector = <TSelected>(
    selector: (state: RootState) => TSelected
) => useSelector(selector)

export default store
