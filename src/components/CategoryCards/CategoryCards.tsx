import './categoryCards.scss'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useGetAllCategoriesQuery } from '../../services/categoriesApi'
import {
    setAllCategories,
    addActiveCategorieFilter,
} from '../../store/appSlice/categoriesSlice'
import { RootState } from '../../store'
import {
    CategoryData,
    categoryDataInterface,
} from '../../services/categoriesApi'
import createFunctionsForCatalog from '../../utils/functionsForCatalog'
import { removeAllFilters } from '../../store/appSlice/categoriesSlice'
const CategoryCards = () => {
    const dispatch = useDispatch()
    const categories = useSelector(
        (state: RootState) => state.categories.allCategories
    )
    const { addActiveFilter } = createFunctionsForCatalog(dispatch)
    const { data, isFetching, isError } = useGetAllCategoriesQuery()

    useEffect(() => {
        if (data) {
            // Dispatch the fetched data to update the state in the Redux store.
            dispatch(setAllCategories(data))
        }
    }, [data])

    const onCatalogWithCategorie = (categorie: categoryDataInterface) => {
        dispatch(removeAllFilters())
        addActiveFilter(categorie)
    }

    const onBuildCategoriesItems = (data: categoryDataInterface[]) => {
        return data.map((category) => {
            const { name, img, _id } = category
            return (
                <Link
                    to={'/catalog'}
                    className="catalog_card"
                    key={_id}
                    onClick={() => onCatalogWithCategorie(category)}
                >
                    <img src={img} alt={name} className="catalog_card_img" />
                    <div className="catalog_card_name">{name}</div>
                    <div className="catalog_card_name_background"></div>
                </Link>
            )
        })
    }

    const onBuildCategoriesLoading = () => {
        const card = (
            <div className="catalog_card catalog_card_loading">
                <div className="catalog_card_name_background"></div>
            </div>
        )
        return [card, card, card, card, card]
    }

    return (
        <section className="catalog_cards">
            <h2 className="section-header">Наш асортимент</h2>
            {isError ? (
                <div className="error">Error occurred while fetching data.</div>
            ) : null}
            <div className="catalog_cards_wrapper">
                {isFetching && categories.length === 0 ? (
                    <>{onBuildCategoriesLoading()}</>
                ) : null}
                {categories.length !== 0 ? (
                    <>{onBuildCategoriesItems(categories)}</>
                ) : null}
            </div>
        </section>
    )
}

export { CategoryCards }
