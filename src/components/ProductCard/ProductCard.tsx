import { Product } from '../../store/appSlice/productsSlice'

import { BuildLoadingCard } from './BuildLoadingCard'
import { BuildCard } from './BuildCard'

export interface ProductCardProps {
    productData: Product | null
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
