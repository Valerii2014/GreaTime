import './catalog.scss'

import { useEffect } from 'react'
import { onTransformString } from '../../utils/stringTransformer'
import { setPositionsOffset } from '../../store/appSlice/positionsSlice'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../store'
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

import CatalogProductContainer from '../CatalogProductContainer/CatalogProductContainer'
import { Spinner } from '../spinner/Spinner'

const Catalog = () => {
    const dispatch = useDispatch()
    const { allCategories, activeCategoriesFilter, visibleSubcategories } =
        useAppSelector((state) => state.categories)
    const positionsQuantity = useAppSelector(
        (state) => state.positions.positions.length
    )

    const { data, isFetching, isError } = useGetAllCategoriesQuery()
    useEffect(() => {
        if (data) {
            dispatch(setAllCategories(data))
        }
    }, [data])

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
    const checkIsCatActive = (categori: categoryDataInterface) => {
        if (categori.subcat) {
            return categori.subcat.every((subcat) =>
                activeCategoriesFilter.includes(subcat)
            )
        } else {
            return activeCategoriesFilter.includes(categori._id)
        }
    }
    // check that subcategoory contains in active category array
    const checkIsSubcatActive = (subcat: subcatDataInterface) =>
        activeCategoriesFilter.some((activeCat) => activeCat === subcat._id)

    //check that categorie has no less that 1 active subcategorie
    const checkOneOfSubcatIsActive = (categori: categoryDataInterface) => {
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
            if (activeCategoriesFilter.includes(categoriId))
                return () => deleteActiveFilter(categoriId)
            // active filters contain the categori id
            else return () => addActiveFilter(categoriId) // active filters doesnt contain the categori id
        }
    }

    const buildVisualActiveCategories = (allCategories: CategoryData) => {
        const activeCategorieNames: string[] = []
        allCategories.forEach((categorie) => {
            if (checkOneOfSubcatIsActive(categorie))
                activeCategorieNames.push(categorie.name)
            else if (checkIsCatActive(categorie))
                activeCategorieNames.push(categorie.name)
        })
        const allText = activeCategorieNames.join(', ')
        const formatedText =
            allText.length > 72
                ? allText.slice(0, 69) + '...'
                : allText.length === 0
                ? 'Выберите одну или несколько категорий'
                : allText
        return formatedText
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
                    key={subcatId}
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
                <li
                    className={`catalog_categories_list_item ${activeClass}`}
                    key={categoriId}
                >
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
        return categoriesList
    }

    return (
        <div className="catalog">
            <div className="container">
                <div className="catalog_wrapper">
                    <div className="catalog_categories_catalog">Каталог</div>
                    <div className="catalog_categories_choice">
                        {buildVisualActiveCategories(allCategories)}
                    </div>
                    <div className="catalog_categories_list-wrapper">
                        {isFetching ? <Spinner /> : null}
                        <ul className="catalog_categories_list">
                            {allCategories.length !== 0
                                ? onBuildCategories(allCategories)
                                : null}
                        </ul>
                    </div>
                    <div className="catalog_positions">
                        <CatalogProductContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Catalog
