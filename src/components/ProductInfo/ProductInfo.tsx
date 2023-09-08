import './productInfo.scss'

import { Product } from '../../store/appSlice/productsSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetProductWithIdQuery } from '../../services/productsApi'

const ProductInfo = () => {
    const navigate = useNavigate()
    const { productId } = useParams()
    const fetchString = productId || ''
    const { data, isLoading, isError } = useGetProductWithIdQuery([fetchString])

    const getProductData = (productData: Product) => {
        const { imgs, rate, name, price, prevPrice, _id } = productData
        const img = imgs[0]
        return { rate, name, price, prevPrice, _id, img }
    }

    const productData = data && data[0] ? getProductData(data[0]) : null

    return (
        <div className="product-info">
            <div className="product-info_images"></div>
            <div className="product-info_information">
                <div className="product-info_information_top-line"></div>
                <div className="product-info_information_title"></div>
                <div className="product-info_information_deskr"></div>
            </div>
        </div>
    )
}

export default ProductInfo
