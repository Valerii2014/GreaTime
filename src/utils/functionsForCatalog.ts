import { Dispatch } from '@reduxjs/toolkit'

import { setProductsOffset } from '../store/appSlice/productsSlice'
import {
    addActiveCategorieFilter,
    deleteActiveCategorieFilter,
} from '../store/appSlice/categoriesSlice'

import {
    categoryDataInterface,
    subcatDataInterface,
} from '../services/categoriesApi'

const createFunctionsForCatalog = (dispatch: Dispatch) => {
    // add/delete filter for filtrationproducts with categories
    const addActiveFilter = (categorie: categoryDataInterface | string) => {
        dispatch(addActiveCategorieFilter(categorie))
        dispatch(setProductsOffset(0))
    }

    const deleteActiveFilter = (categorie: categoryDataInterface | string) => {
        dispatch(deleteActiveCategorieFilter(categorie))
        dispatch(setProductsOffset(0))
    }
    // check that categoory contains in active category array
    const checkIsCatActive = (
        categori: categoryDataInterface,
        activeCategoriesFilter: string[]
    ) => {
        if (categori.subcat) {
            return categori.subcat.every((subcat) =>
                activeCategoriesFilter.includes(subcat)
            )
        } else {
            return activeCategoriesFilter.includes(categori._id)
        }
    }
    // check that subcategoory contains in active category array
    const checkIsSubcatActive = (
        subcat: subcatDataInterface,
        activeCategoriesFilter: string[]
    ) => activeCategoriesFilter.some((activeCat) => activeCat === subcat._id)

    //check that categorie has no less that 1 active subcategorie
    const checkOneOfSubcatIsActive = (
        categori: categoryDataInterface,
        activeCategoriesFilter: string[]
    ) => {
        if (categori.subcat) {
            return categori.subcat.some((subcat) =>
                activeCategoriesFilter.includes(subcat)
            )
        }
    }

    // add/delete all subcategories from categorie to activeFilter state
    const checkCatTypeAndAddToFilters = (categorie: categoryDataInterface) => {
        if (categorie.subcat) {
            dispatch(addActiveCategorieFilter(categorie))
        } else {
            dispatch(addActiveCategorieFilter(categorie._id))
        }
    }
    const checkCatTypeAndRemoveFromFilters = (
        categori: categoryDataInterface
    ) => {
        if (categori.subcat) {
            dispatch(deleteActiveCategorieFilter(categori))
        } else {
            dispatch(deleteActiveCategorieFilter(categori._id))
        }
    }

    //get callback for categorie item (categorie maybe contains subcats or nohave subcats)
    const getOnClickActiveCB = (
        categorie: categoryDataInterface,
        isActive: boolean = false
    ) => {
        const categoriId = categorie._id

        // categorie have subcats
        if (isActive) return () => checkCatTypeAndRemoveFromFilters(categorie)
        // active filters contains all subcategoi from this categorie
        else return () => checkCatTypeAndAddToFilters(categorie) // active filters doesnt contain all subcats from cat
    }

    return {
        addActiveFilter,
        deleteActiveFilter,
        checkIsCatActive,
        checkIsSubcatActive,
        checkOneOfSubcatIsActive,
        checkCatTypeAndAddToFilters,
        checkCatTypeAndRemoveFromFilters,
        getOnClickActiveCB,
    }
}

export default createFunctionsForCatalog
