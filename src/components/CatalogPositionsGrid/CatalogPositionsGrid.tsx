import './catalogPositionsGrid.scss'
import { ItemCard } from '../ItemCard/ItemCard'
import ItemLine from '../ItemLine/ItemLine'
import { useAppSelector } from '../../store'
import { PositionsData } from '../../store/appSlice/positionsSlice'
import { SortTypeLiteral } from '../../store/appSlice/positionsSlice'
import getItemPercentSale from '../../utils/getPercentSale'

const CatalogPositionsGrid = () => {
    const sortType = useAppSelector((state) => state.positions.sortType.type)

    const {
        positions,
        positionsType,
        quantityPositionsOnPage,
        positionsOffset,
    } = useAppSelector((state) => state.positions)

    const containerType =
        positionsType === 'card' ? 'positions-grid' : 'positions-line'

    const sortedPositionsData =
        positions.length > 0 ? onSortPositionsData(positions, sortType) : null

    return (
        <div className={containerType}>
            {sortedPositionsData
                ? buildPositionCards(
                      sortedPositionsData,
                      positionsType,
                      quantityPositionsOnPage,
                      positionsOffset
                  )
                : null}
        </div>
    )
}

export default CatalogPositionsGrid

const buildPositionCards = (
    data: PositionsData,
    type: 'card' | 'line',
    quantity: number,
    offset: number
) => {
    const Builder = type === 'card' ? ItemCard : ItemLine
    const copyData: PositionsData = JSON.parse(JSON.stringify(data)).slice(
        offset,
        quantity + offset
    )
    return copyData.map((positionData) => Builder(positionData))
}

const onSortPositionsData = (data: PositionsData, type: SortTypeLiteral) => {
    const copyData: PositionsData = JSON.parse(JSON.stringify(data))
    switch (type) {
        case 'less-more_price':
            return copyData.sort(
                (position1, position2) => position1.price - position2.price
            )
        case 'more-less_price':
            return copyData.sort(
                (position1, position2) => position2.price - position1.price
            )
        case 'popular':
            return copyData.sort(
                (position1, position2) => position2.rate - position1.rate
            )
        case 'with_sale':
            return copyData.sort((position1, position2) => {
                const saleOne = getItemPercentSale(position1)
                const saleTwo = getItemPercentSale(position2)
                return saleTwo - saleOne
            })
        default:
            return data
    }
}
