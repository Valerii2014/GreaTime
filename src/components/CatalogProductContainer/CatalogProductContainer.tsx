import './productContainer.scss'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../store'
import { useGetSubcatsPositionsQuery } from '../../services/positionsApi'
import { setPositions } from '../../store/appSlice/positionsSlice'

import LoadingLine from '../LoadingLine/LoadingLine'
import CatalogPagesPanel from '../CatalogPagesPanel/CatalogPagesPanel'
import CatalogPositionsGrid from '../CatalogPositionsGrid/CatalogPositionsGrid'
import PositionFunctionalPanel from '../PositionFunctionalPanel/PositionFunctionalPanel'

const CatalogProductContainer = () => {
    const dispatch = useDispatch()
    const subcatsId = useAppSelector(
        (state) => state.categories.activeCategoriesFilter
    )
    const haveActiveCategory = subcatsId.length > 0
    const { data, isLoading, isError } = useGetSubcatsPositionsQuery(subcatsId)

    useEffect(() => {
        if (data) {
            dispatch(setPositions(data))
        }
    }, [data])

    const InfoText =
        !isLoading && data?.length === 0 ? (
            <div className="product-container_info">
                К сожалению в выбранной категории, на данный момент, нет товаров
            </div>
        ) : null
    const Loading = isLoading && subcatsId.length > 0 ? <LoadingLine /> : null
    const inactiveClass =
        data && data.length > 0 && haveActiveCategory ? '' : '_inactive'
    return (
        <>
            {Loading}
            {InfoText}
            <div className={`product-container${inactiveClass}`}>
                {PositionFunctionalPanel()}
                {CatalogPositionsGrid()}
                {CatalogPagesPanel()}
            </div>
        </>
    )
}

export default CatalogProductContainer
