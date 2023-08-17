import { Dispatch } from '@reduxjs/toolkit'

import { setPositionsOffset } from '../../store/appSlice/positionsSlice'
import {
    addActiveCategorieFilter,
    removeActiveCategorieFilter,
    addVisibleSubcats,
} from '../../store/appSlice/categoriesSlice'

import {
    categoryDataInterface,
    subcatDataInterface,
} from '../../services/categoriesApi'

const createFunctionsForCatalog = (dispatch: Dispatch) => {
    // add/delete filter for filtration positions with categories
    const addActiveFilter = (categoriId: string) => {
        dispatch(addActiveCategorieFilter(categoriId))
        dispatch(setPositionsOffset(0))
    }

    const deleteActiveFilter = (categoriId: string) => {
        dispatch(removeActiveCategorieFilter(categoriId))
        dispatch(setPositionsOffset(0))
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
    const addAllSubcatToActive = (categori: categoryDataInterface) => {
        if (categori.subcat) {
            categori.subcat.forEach((id) =>
                dispatch(addActiveCategorieFilter(id))
            )
            dispatch(addVisibleSubcats(categori._id))
            dispatch(setPositionsOffset(0))
        }
    }
    const deleteAllSubcatFromActive = (categori: categoryDataInterface) => {
        if (categori.subcat) {
            categori.subcat.forEach((id) =>
                dispatch(removeActiveCategorieFilter(id))
            )
            dispatch(setPositionsOffset(0))
        }
    }

    //get callback for categorie item (categorie maybe contains subcats or nohave subcats)
    const getOnClickActiveCB = (
        categorie: categoryDataInterface,
        activeCategoriesFilter: string[],
        isActive: boolean
    ) => {
        const categoriId = categorie._id
        if (categorie.subcat) {
            // categorie have subcats
            if (isActive) return () => deleteAllSubcatFromActive(categorie)
            // active filters contains all subcategoi from this categorie
            else return () => addAllSubcatToActive(categorie) // active filters doesnt contain all subcats from cat
        } else {
            // categorie has no subcats
            if (activeCategoriesFilter.includes(categoriId))
                return () => deleteActiveFilter(categoriId)
            // active filters contain the categori id
            else return () => addActiveFilter(categoriId) // active filters doesnt contain the categori id
        }
    }

    return {
        addActiveFilter,
        deleteActiveFilter,
        checkIsCatActive,
        checkIsSubcatActive,
        checkOneOfSubcatIsActive,
        addAllSubcatToActive,
        deleteAllSubcatFromActive,
        getOnClickActiveCB,
    }
}

export default createFunctionsForCatalog
