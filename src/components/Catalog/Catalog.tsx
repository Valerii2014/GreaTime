import './catalog.scss'

import { useEffect } from 'react'
import { onTransformString } from '../../utils/stringTransformer'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import {
    setAllCategories,
    addActiveCategorieFilter,
    removeActiveCategorieFilter,
    addVisibleSubcats,
    deleteVisibleSubcats,
} from '../../store/appSlice/categoriesSlice'
import {
    useGetAllCategoriesQuery,
    CategoryData,
    categoryDataInterface,
    subcatDataInterface,
} from '../../services/categoriesApi'
import CatalogPositionsGrid from '../CatalogPositionsGrid/CatalogPositionsGrid'
import PositionFunctionalPanel from '../PositionFunctionalPanel/PositionFunctionalPanel'

const Catalog = () => {
    const categoriesData: CategoryData = useSelector(
        (state: RootState) => state.categories.allCategories
    )
    const activeCategories: string[] = useSelector(
        (state: RootState) => state.categories.activeCategoriesFilter
    )
    const visibleSubcategories: string[] = useSelector(
        (state: RootState) => state.categories.visibleSubcategories
    )
    const dispatch = useDispatch()
    const { data } = useGetAllCategoriesQuery()
    useEffect(() => {
        if (data) {
            dispatch(setAllCategories(data))
        }
    }, [data])

    // add/delete filter for filtration positions
    const addActiveFilter = (categoriId: string) =>
        dispatch(addActiveCategorieFilter(categoriId))

    const deleteActiveFilter = (categoriId: string) => {
        console.log(categoriId)
        dispatch(removeActiveCategorieFilter(categoriId))
    }
    // check that categoory contains in active category array
    const checkIsCatActive = (categori: categoryDataInterface) => {
        if (categori.subcat) {
            return categori.subcat.every((subcat) =>
                activeCategories.includes(subcat)
            )
        } else {
            return activeCategories.includes(categori._id)
        }
    }
    // check that subcategoory contains in active category array
    const checkIsSubcatActive = (subcat: subcatDataInterface) =>
        activeCategories.some((activeCat) => activeCat === subcat._id)

    //check that categorie has no less that 1 active subcategorie
    const checkOneOfSubcatIsActive = (categori: categoryDataInterface) => {
        if (categori.subcat) {
            return categori.subcat.some((subcat) =>
                activeCategories.includes(subcat)
            )
        }
    }

    // add/delete all subcategories from categorie to activeFilter state
    const addAllSubcatToActive = (categori: categoryDataInterface) => {
        if (categori.subcat) {
            categori.subcat.forEach((id) =>
                dispatch(addActiveCategorieFilter(id))
            )
        }
    }
    const deleteAllSubcatFromActive = (categori: categoryDataInterface) => {
        if (categori.subcat) {
            categori.subcat.forEach((id) =>
                dispatch(removeActiveCategorieFilter(id))
            )
        }
    }

    //get callback for categorie item (categorie maybe contains subcats or nohave subcats)
    const getOnClickActiveCB = (
        categoriItem: categoryDataInterface,
        isActive: boolean
    ) => {
        const categoriId = categoriItem._id
        if (categoriItem.subcat) {
            // categorie have subcats
            if (isActive) return () => deleteAllSubcatFromActive(categoriItem)
            // active filters contains all subcategoi from this categorie
            else return () => addAllSubcatToActive(categoriItem) // active filters doesnt contain all subcats from cat
        } else {
            // categorie has no subcats
            if (activeCategories.includes(categoriId))
                return () => deleteActiveFilter(categoriId)
            // active filters contain the categori id
            else return () => addActiveFilter(categoriId) // active filters doesnt contain the categori id
        }
    }

    const onBuildsubcatData = (catalogItems: subcatDataInterface[]) => {
        const subcatDataList: JSX.Element[] = []
        catalogItems.forEach((subcatDataItem) => {
            const subcatName = onTransformString(subcatDataItem.name)
            const subcatId = subcatDataItem._id
            const activeCurrentCategori = checkIsSubcatActive(subcatDataItem)

            const activeClass = activeCurrentCategori
                ? 'catalog_subcategories_list_item_active'
                : ''

            const onClickCB = activeCurrentCategori
                ? () => deleteActiveFilter(subcatId)
                : () => addActiveFilter(subcatId)
            subcatDataList.push(
                <li
                    className={`catalog_subcategories_list_item  ${activeClass}`}
                    onClick={onClickCB}
                >
                    <div className="catalog_subcategories_list_item_wrapper">
                        <span>{subcatName}</span>
                    </div>
                </li>
            )
        })
        return <ul className="catalog_subcategories_list">{subcatDataList}</ul>
    }

    const onBuildCategories = (categoriesItems: CategoryData) => {
        const categoriesList: JSX.Element[] = []

        categoriesItems.forEach((categoriItem) => {
            const categoriesName = onTransformString(categoriItem.name)
            const categoriId = categoriItem._id
            const activeClass = checkIsCatActive(categoriItem)
                ? 'catalog_categories_list_item_active'
                : ''
            const activeSubcategory =
                checkOneOfSubcatIsActive(categoriItem) ||
                visibleSubcategories.some((cat) => cat === categoriId)

            const onClickVisibleCB = activeSubcategory
                ? () => dispatch(deleteVisibleSubcats(categoriId))
                : () => dispatch(addVisibleSubcats(categoriId))
            const onClickActiveCB = getOnClickActiveCB(
                categoriItem,
                activeClass ? true : false
            )

            categoriesList.push(
                <li className={`catalog_categories_list_item ${activeClass}`}>
                    <div className="catalog_categories_list_item_wrapper">
                        <span onClick={onClickActiveCB}>{categoriesName}</span>

                        {categoriItem.subcatData ? (
                            <img
                                src={`./icons/system/${
                                    activeSubcategory
                                        ? 'catalog-arrow-active'
                                        : 'catalog-arrow'
                                }.svg`}
                                alt="More/many"
                                onClick={onClickVisibleCB}
                            />
                        ) : null}
                    </div>

                    {activeSubcategory
                        ? onBuildsubcatData(categoriItem.subcatData!)
                        : null}
                </li>
            )
        })
        return <ul className="catalog_categories_list">{categoriesList}</ul>
    }

    return (
        <div className="catalog">
            <div className="container">
                <div className="catalog_wrapper">
                    <div className="catalog_categories_catalog">Каталог</div>
                    <div className="catalog_categories_choice">Мячи</div>
                    {categoriesData.length !== 0
                        ? onBuildCategories(categoriesData)
                        : null}

                    <div className="catalog_positions">
                        {activeCategories.length >= 1 ? (
                            <>
                                <PositionFunctionalPanel />
                                <CatalogPositionsGrid />
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Catalog
