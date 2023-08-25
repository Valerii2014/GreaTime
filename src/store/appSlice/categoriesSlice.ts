import { createSlice } from '@reduxjs/toolkit'
import {
    CategoryData,
    SliderData,
    categoryDataInterface,
    subcatDataInterface,
} from '../../services/categoriesApi'
import { isObject } from 'formik'

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
            const categorie: string | categoryDataInterface = action.payload
            if (typeof categorie === 'object') {
                if (categorie.subcat) {
                    state.activeCategoriesFilter = [
                        ...state.activeCategoriesFilter,
                        ...categorie.subcat,
                    ]
                    state.visibleSubcategories.push(categorie._id)
                } else {
                    state.activeCategoriesFilter.push(categorie._id)
                }
            } else if (typeof categorie === 'string') {
                state.activeCategoriesFilter.push(categorie)
            }
        },
        deleteActiveCategorieFilter: (state, action) => {
            const categorie: string | categoryDataInterface = action.payload
            if (typeof categorie === 'object') {
                if (categorie.subcat) {
                    state.activeCategoriesFilter =
                        state.activeCategoriesFilter.filter(
                            (activeCat) =>
                                !categorie.subcat!.includes(activeCat)
                        )
                } else {
                    state.activeCategoriesFilter.push(categorie._id)
                }
            } else if (typeof categorie === 'string') {
                state.activeCategoriesFilter =
                    state.activeCategoriesFilter.filter(
                        (categorie) => categorie !== action.payload
                    )
            }
        },
        removeAllFilters: (state) => {
            state.activeCategoriesFilter = []
            state.visibleSubcategories = []
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
    setSliderData,
    removeAllFilters,
    setAllCategories,
    addVisibleSubcats,
    deleteVisibleSubcats,
    addActiveCategorieFilter,
    deleteActiveCategorieFilter,
} = actions
