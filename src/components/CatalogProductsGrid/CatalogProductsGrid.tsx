import './catalogProductsGrid.scss'
import ProductCard from '../ProductCard/ProductCard'
import ItemLine from '../ItemLine/ItemLine'
import { useAppSelector } from '../../store'
import { ProductsData, Product } from '../../store/appSlice/productsSlice'
import { SortTypeLiteral } from '../../store/appSlice/productsSlice'
import getItemPercentSale from '../../utils/getPercentSale'

const CatalogproductsGrid = () => {
    const sortType = useAppSelector((state) => state.products.sortType.type)

    const { products, productsType, quantityProductsOnPage, productsOffset } =
        useAppSelector((state) => state.products)

    const containerType =
        productsType === 'card' ? 'products-grid' : 'products-line'

    const sortedproductsData =
        products.length > 0 ? onSortproductsData(products, sortType) : null

    const buildProductCards = (
        data: ProductsData,
        type: 'card' | 'line',
        quantity: number,
        offset: number
    ) => {
        const Builder = type === 'card' ? ProductCard : ItemLine
        const copyData: ProductsData = JSON.parse(JSON.stringify(data)).slice(
            offset,
            quantity + offset
        )
        return copyData.map((productsData) => (
            <Builder key={productsData._id} productData={productsData} />
        ))
    }
    const VisibleProductsGrid = sortedproductsData
        ? buildProductCards(
              sortedproductsData,
              productsType,
              quantityProductsOnPage,
              productsOffset
          )
        : buildLoadinProducts()

    return <div className={containerType}>{VisibleProductsGrid}</div>
}

export default CatalogproductsGrid
//
//
//
//
//________________________________________________________________________________
//
//
//
//
const onSortproductsData = (data: ProductsData, type: SortTypeLiteral) => {
    const copyData: ProductsData = JSON.parse(JSON.stringify(data))
    switch (type) {
        case 'less-more_price':
            return copyData.sort(
                (Product1, Product2) => Product1.price - Product2.price
            )
        case 'more-less_price':
            return copyData.sort(
                (Product1, Product2) => Product2.price - Product1.price
            )
        case 'popular':
            return copyData.sort(
                (Product1, Product2) => Product2.rate - Product1.rate
            )
        case 'with_sale':
            return copyData.sort((Product1, Product2) => {
                const saleOne = getItemPercentSale(
                    Product1.price,
                    Product1.prevPrice
                )
                const saleTwo = getItemPercentSale(
                    Product2.price,
                    Product2.prevPrice
                )
                return saleTwo - saleOne
            })
        default:
            return data
    }
}

const buildLoadinProducts = () => {
    return [
        <ProductCard key={2} productData={null} />,
        <ProductCard key={1} productData={null} />,
        <ProductCard key={3} productData={null} />,
        <ProductCard key={4} productData={null} />,
        <ProductCard key={5} productData={null} />,
        <ProductCard key={6} productData={null} />,
        <ProductCard key={7} productData={null} />,
        <ProductCard key={8} productData={null} />,
        <ProductCard key={9} productData={null} />,
    ]
}
