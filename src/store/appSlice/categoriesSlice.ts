import { createSlice } from '@reduxjs/toolkit'
import {
    CategoryData,
    SliderData,
    categoryDataInterface,
} from '../../services/categoriesApi'

export interface CategoriesSliceStateInterface {
    allCategories: CategoryData
    activeCategoriesFilter: string[]
    visibleSubcategories: string[]
    sliderData: SliderData
}

const initialState: CategoriesSliceStateInterface = {
    allCategories: [],
    activeCategoriesFilter: [],
    visibleSubcategories: [],
    sliderData: [],
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setAllCategories: (state, action) => {
            const catsWithSubcats: CategoryData = []
            const catsWithoutSubcats: CategoryData = []
            action.payload.forEach((categorie: categoryDataInterface) => {
                if (categorie.subcat) {
                    catsWithSubcats.push(categorie)
                } else {
                    catsWithoutSubcats.push(categorie)
                }
            })
            catsWithSubcats.reverse()
            state.allCategories = [...catsWithSubcats, ...catsWithoutSubcats]
        },
        addActiveCategorieFilter: (state, action) => {
            state.activeCategoriesFilter.push(action.payload)
        },
        removeActiveCategorieFilter: (state, action) => {
            state.activeCategoriesFilter = state.activeCategoriesFilter.filter(
                (categorie) => categorie !== action.payload
            )
        },
        setSliderData: (state, action) => {
            state.sliderData = action.payload
        },
        addVisibleSubcats: (state, action) => {
            state.visibleSubcategories.push(action.payload)
        },
        deleteVisibleSubcats: (state, action) => {
            state.visibleSubcategories = state.visibleSubcategories.filter(
                (categorie) => categorie !== action.payload
            )
        },
    },
})

const { actions, reducer } = categoriesSlice
export default reducer
export const {
    setAllCategories,
    setSliderData,
    addActiveCategorieFilter,
    removeActiveCategorieFilter,
    addVisibleSubcats,
    deleteVisibleSubcats,
} = actions
