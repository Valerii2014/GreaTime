import './categoryCards.scss'
import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetAllCategoriesQuery } from '../../services/categoriesApi'
import { setAllCategories } from '../../store/appSlice/categoriesSlice'
import { RootState } from '../../store'
import { categoryDataInterface } from '../../services/categoriesApi'

const CategoryCards = () => {
    const categories = useSelector(
        (state: RootState) => state.categories.allCategories
    )
    const dispatch = useDispatch()

    const { data, isFetching, isError } = useGetAllCategoriesQuery()

    useEffect(() => {
        if (data) {
            // Dispatch the fetched data to update the state in the Redux store.
            dispatch(setAllCategories(data))
        }
    }, [data])

    const onBuildCategoriesItems = (data: categoryDataInterface[]) => {
        return data.map((category, key) => {
            const { name, img } = category
            return (
                <div className="catalog_card" key={key}>
                    <img src={img} alt={name} className="catalog_card_img" />
                    <div className="catalog_card_name">{name}</div>
                    <div className="catalog_card_name_background"></div>
                </div>
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
