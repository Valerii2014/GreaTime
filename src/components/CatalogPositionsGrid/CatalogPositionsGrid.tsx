import './catalogPositionsGrid.scss'
import ProductCard from '../ProductCard/ProductCard'
import ItemLine from '../ItemLine/ItemLine'
import { useAppSelector } from '../../store'
import { PositionsData, Position } from '../../store/appSlice/positionsSlice'
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

    const buildPositionCards = (
        data: PositionsData,
        type: 'card' | 'line',
        quantity: number,
        offset: number
    ) => {
        const Builder = type === 'card' ? ProductCard : ItemLine
        const copyData: PositionsData = JSON.parse(JSON.stringify(data)).slice(
            offset,
            quantity + offset
        )
        return copyData.map((productData) => (
            <Builder key={productData._id} productData={productData} />
        ))
    }
    const VisibleProductsGrid = sortedPositionsData
        ? buildPositionCards(
              sortedPositionsData,
              positionsType,
              quantityPositionsOnPage,
              positionsOffset
          )
        : buildLoadinProducts()

    return <div className={containerType}>{VisibleProductsGrid}</div>
}

export default CatalogPositionsGrid
//
//
//
//
//________________________________________________________________________________
//
//
//
//
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
                const saleOne = getItemPercentSale(
                    position1.price,
                    position1.prevPrice
                )
                const saleTwo = getItemPercentSale(
                    position2.price,
                    position2.prevPrice
                )
                return saleTwo - saleOne
            })
        default:
            return data
    }
}

const buildLoadinProducts = () => {
    return [
        <ProductCard key={1} productData={null} />,
        <ProductCard key={2} productData={null} />,
        <ProductCard key={3} productData={null} />,
        <ProductCard key={4} productData={null} />,
        <ProductCard key={5} productData={null} />,
        <ProductCard key={6} productData={null} />,
        <ProductCard key={7} productData={null} />,
        <ProductCard key={8} productData={null} />,
        <ProductCard key={9} productData={null} />,
    ]
}
