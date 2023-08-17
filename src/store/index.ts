import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { categoriesApi } from '../services/categoriesApi'
import { positionsApi } from '../services/positionsApi'
import { useSelector } from 'react-redux'
import categories, {
    CategoriesSliceStateInterface,
} from './appSlice/categoriesSlice'
import positions, {
    positionsSliceInitialState,
} from './appSlice/positionsSlice'
import sliderAndModal from './appSlice/sliderAndModalSlice'

const rootReducer = combineReducers({
    categories,
    positions,
    sliderAndModal,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [positionsApi.reducerPath]: positionsApi.reducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            categoriesApi.middleware,
            positionsApi.middleware
        ),
    devTools: process.env.NODE_ENV !== 'production',
})

// Use RootState to access the complete state
export type RootState = ReturnType<typeof rootReducer>

export const useAppSelector = <TSelected>(
    selector: (state: RootState) => TSelected
) => useSelector(selector)

export default store
