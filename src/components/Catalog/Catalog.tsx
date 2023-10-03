import './catalog.scss'

import { useEffect, useState, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector, RootState } from '../../store'

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

import { Spinner } from '../spinner/Spinner'
import CatalogProductContainer from '../CatalogProductContainer/CatalogProductContainer'

import { onTransformString } from '../../utils/stringTransformer'
import createFunctionsForCatalog from '../../utils/functionsForCatalog'

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
        useAppSelector((state: RootState) => state.categories)

    const { displayWidth } = useAppSelector((state: RootState) => state.user)

    const [visibleCategoriesForMobileMode, setVisibleCategoriesForMobileMode] =
        useState(activeCategoriesFilter.length > 0 ? false : true)

    const appMode = displayWidth > 991 ? 'desktop' : 'mobile'

    const { data, isFetching, isError } = useGetAllCategoriesQuery()

    useEffect(() => {
        if (data) {
            dispatch(setAllCategories(data))
        }
    }, [data])

    const buildActiveCategoriesList = (allCategories: CategoryData) => {
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

    const BuildsubcatList = (catalogItems: subcatDataInterface[]) => {
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

    const BuildCategoriesList = (categoriesItems: CategoryData) => {
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
                        ? BuildsubcatList(categorie.subcatData!)
                        : null}
                </li>
            )
        }

        return categoriesList
    }

    const Loading = isFetching ? <Spinner /> : null
    const CategoriesList =
        allCategories.length !== 0 ? BuildCategoriesList(allCategories) : null

    return (
        <div
            className="catalog"
            onClick={(event: MouseEvent<HTMLDivElement>) => {
                if (
                    event.target instanceof HTMLDivElement &&
                    (event.target.classList.contains('catalog') ||
                        event.target.classList.contains(
                            'catalog_categories_list-wrapper'
                        ))
                ) {
                    setVisibleCategoriesForMobileMode(false)
                }
            }}
        >
            <div className="container">
                <div
                    className={`catalog_wrapper ${
                        appMode === 'mobile' ? 'catalog_wrapper_mobile' : ''
                    }`}
                >
                    <div className="catalog_categories_title">Каталог</div>
                    <div className="catalog_categories_choice">
                        {buildActiveCategoriesList(allCategories)}
                    </div>

                    {appMode === 'mobile' ? (
                        <button
                            className="button button_filters_mobile"
                            onClick={() => {
                                setVisibleCategoriesForMobileMode(
                                    (visibleCategoriesForMobileMode) =>
                                        !visibleCategoriesForMobileMode
                                )
                            }}
                        >
                            {visibleCategoriesForMobileMode
                                ? 'Скрыть категории'
                                : 'Показать категории'}
                        </button>
                    ) : null}

                    <div
                        className={`catalog_categories_list-wrapper${
                            !visibleCategoriesForMobileMode &&
                            appMode === 'mobile'
                                ? '_hide'
                                : ''
                        }`}
                    >
                        {Loading}
                        <ul className="catalog_categories_list">
                            {CategoriesList}
                        </ul>
                    </div>
                    <div className="catalog_products">
                        <CatalogProductContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Catalog
