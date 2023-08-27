import { Position } from '../../store/appSlice/positionsSlice'
import { BuildLoadingCard } from './BuildLoadingCard'
import { BuildCard } from './BuildCard'

export interface ProductCardProps {
    productData: Position | null
}

const ProductCard = (props: ProductCardProps) => {
    const { productData } = props

    return (
        <>
            {productData ? (
                <BuildCard {...productData} />
            ) : (
                <BuildLoadingCard />
            )}
        </>
    )
}

export default ProductCard
