import './catalog.scss'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../store'

import {
    setAllCategories,
    addVisibleSubcats,
    deleteVisibleSubcats,
} from '../../store/appSlice/categoriesSlice'
import {
    useGetAllCategoriesQuery,
    CategoryData,
    subcatDataInterface,
} from '../../services/categoriesApi'

import createFunctionsForCatalog from '../../utils/functionsForCatalog'

import { Spinner } from '../spinner/Spinner'
import { onTransformString } from '../../utils/stringTransformer'
import CatalogProductContainer from '../CatalogProductContainer/CatalogProductContainer'

const Catalog = () => {
    const dispatch = useDispatch()
    const {
        addActiveFilter,
        deleteActiveFilter,
        checkIsCatActive,
        checkIsSubcatActive,
        checkOneOfSubcatIsActive,
        getOnClickActiveCB,
    } = createFunctionsForCatalog(dispatch)

    const { allCategories, activeCategoriesFilter, visibleSubcategories } =
        useAppSelector((state) => state.categories)

    const { data, isFetching, isError } = useGetAllCategoriesQuery()
    useEffect(() => {
        if (data) {
            dispatch(setAllCategories(data))
        }
    }, [data])

    const buildVisualActiveCategories = (allCategories: CategoryData) => {
        const activeCategorieNames: string[] = []

        for (const categorie of allCategories) {
            if (checkOneOfSubcatIsActive(categorie, activeCategoriesFilter))
                activeCategorieNames.push(categorie.name)
            else if (checkIsCatActive(categorie, activeCategoriesFilter))
                activeCategorieNames.push(categorie.name)
        }

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

        for (const subcatDataItem of catalogItems) {
            const subcatName = onTransformString(subcatDataItem.name)
            const subcatId = subcatDataItem._id
            const activeCurrentCategori = checkIsSubcatActive(
                subcatDataItem,
                activeCategoriesFilter
            )

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
        }
        return <ul className="catalog_subcategories_list">{subcatDataList}</ul>
    }

    const onBuildCategories = (categoriesItems: CategoryData) => {
        const categoriesList: JSX.Element[] = []

        for (const categorie of categoriesItems) {
            const categoriesName = onTransformString(categorie.name)
            const categoriId = categorie._id
            const activeClass = checkIsCatActive(
                categorie,
                activeCategoriesFilter
            )
                ? 'catalog_categories_list_item_active'
                : ''
            const isVisibleSubcategories = visibleSubcategories.some(
                (cat) => cat === categoriId
            )
            const isOneOfSubcatIsActive = checkOneOfSubcatIsActive(
                categorie,
                activeCategoriesFilter
            )
            const activeSubcategory =
                isOneOfSubcatIsActive || isVisibleSubcategories

            const onClickVisibleCB = () => {
                if (!activeSubcategory) {
                    return () => dispatch(addVisibleSubcats(categoriId))
                } else if (!isOneOfSubcatIsActive) {
                    return () => dispatch(deleteVisibleSubcats(categoriId))
                }
            }

            const onClickActiveCB = getOnClickActiveCB(
                categorie,
                activeClass ? true : false
            )

            categoriesList.push(
                <li
                    className={`catalog_categories_list_item ${activeClass}`}
                    key={categoriId}
                >
                    <div className="catalog_categories_list_item_wrapper">
                        <span onClick={onClickActiveCB}>{categoriesName}</span>

                        {categorie.subcatData ? (
                            <img
                                src={`./icons/system/${
                                    activeSubcategory
                                        ? 'catalog-arrow-active'
                                        : 'catalog-arrow'
                                }.svg`}
                                alt="More/many"
                                onClick={onClickVisibleCB()}
                            />
                        ) : null}
                    </div>

                    {activeSubcategory
                        ? onBuildsubcatData(categorie.subcatData!)
                        : null}
                </li>
            )
        }

        return categoriesList
    }

    const Loading = isFetching ? <Spinner /> : null
    const CategoriesList =
        allCategories.length !== 0 ? onBuildCategories(allCategories) : null

    return (
        <div className="catalog">
            <div className="container">
                <div className="catalog_wrapper">
                    <div className="catalog_categories_catalog">Каталог</div>
                    <div className="catalog_categories_choice">
                        {buildVisualActiveCategories(allCategories)}
                    </div>
                    <div className="catalog_categories_list-wrapper">
                        {Loading}
                        <ul className="catalog_categories_list">
                            {CategoriesList}
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
