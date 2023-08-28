import './productContainer.scss'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../store'
import { useGetSubcatsPositionsQuery } from '../../services/positionsApi'
import { setPositions } from '../../store/appSlice/positionsSlice'

import LoadingLine from '../LoadingLine/LoadingLine'
import CatalogPagesPanel from '../CatalogPagesPanel/CatalogPagesPanel'
import CatalogProductsGrid from '../CatalogProductsGrid/CatalogProductsGrid'
import PositionFunctionalPanel from '../PositionFunctionalPanel/PositionFunctionalPanel'

const CatalogProductContainer = () => {
    const dispatch = useDispatch()
    const subcatsId = useAppSelector(
        (state) => state.categories.activeCategoriesFilter
    )
    const haveActiveCategory = subcatsId.length > 0
    const { data, isLoading, isFetching, isError } =
        useGetSubcatsPositionsQuery(subcatsId)

    useEffect(() => {
        if (data) {
            dispatch(setPositions(data))
        }
    }, [data])

    const InfoText =
        !isLoading && data?.length === 0 && haveActiveCategory ? (
            <div className="product-container_info">
                К сожалению в выбранной категории, на данный момент, нет товаров
            </div>
        ) : null
    const Loading = isFetching && subcatsId.length > 0 ? <LoadingLine /> : null

    const inactiveClass =
        (isLoading && haveActiveCategory) ||
        (data && data.length > 0 && haveActiveCategory)
            ? ''
            : '_inactive'
    return (
        <>
            {InfoText}
            {Loading}
            <div className={`product-container${inactiveClass}`}>
                <PositionFunctionalPanel />
                <CatalogProductsGrid />
                <CatalogPagesPanel />
            </div>
        </>
    )
}

export default CatalogProductContainer
