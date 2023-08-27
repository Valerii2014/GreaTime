import './categoryCards.scss'

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../store'
import { categoryDataInterface } from '../../services/categoriesApi'
import { useGetAllCategoriesQuery } from '../../services/categoriesApi'
import { setAllCategories } from '../../store/appSlice/categoriesSlice'
import { removeAllFilters } from '../../store/appSlice/categoriesSlice'

import createFunctionsForCatalog from '../../utils/functionsForCatalog'

const CategoryCards = () => {
    const dispatch = useDispatch()
    const categories = useSelector(
        (state: RootState) => state.categories.allCategories
    )
    const { addActiveFilter } = createFunctionsForCatalog(dispatch)
    const { data, isFetching, isError } = useGetAllCategoriesQuery()

    useEffect(() => {
        if (data) {
            dispatch(setAllCategories(data))
        }
    }, [data])

    const goToCategoryProducts = (categorie: categoryDataInterface) => {
        dispatch(removeAllFilters())
        addActiveFilter(categorie)
    }

    const CategorieCards =
        categories.length !== 0
            ? BuildCategoriesItems(categories, goToCategoryProducts)
            : null

    const CategorieCardsLoading =
        isFetching && categories.length === 0 ? BuildCategoriesLoading() : null

    const CardsError = isError ? (
        <div className="error">Error occurred while fetching data.</div>
    ) : null

    return (
        <section className="catalog_cards">
            <h2 className="section-header">Наш асортимент</h2>
            {CardsError}
            <div className="catalog_cards_wrapper">
                {CategorieCardsLoading}
                {CategorieCards}
            </div>
        </section>
    )
}

export { CategoryCards }

const BuildCategoriesItems = (
    data: categoryDataInterface[],
    goToCategoryProducts: (categorie: categoryDataInterface) => void
) => {
    return data.map((category) => {
        const { name, img, _id } = category
        return (
            <Link
                to={'/catalog'}
                className="catalog_card"
                key={_id}
                onClick={() => goToCategoryProducts(category)}
            >
                <img src={img} alt={name} className="catalog_card_img" />
                <div className="catalog_card_name">{name}</div>
                <div className="catalog_card_name_background"></div>
            </Link>
        )
    })
}

const BuildCategoriesLoading = () => {
    const Card = () => {
        return (
            <div className="catalog_card catalog_card_loading">
                <div className="catalog_card_name_background"></div>
            </div>
        )
    }
    return [
        <Card key={1} />,
        <Card key={2} />,
        <Card key={3} />,
        <Card key={4} />,
        <Card key={5} />,
    ]
}
