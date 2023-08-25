import './itemLine.scss'

import { Position } from '../../store/appSlice/positionsSlice'
import { ReactEventHandler } from 'react'
import { onTransformString } from '../../utils/stringTransformer'
import { ProductCardProps } from '../ProductCard/ProductCard'

const ItemLine = (props: ProductCardProps) => {
    // const { productData } = props
    // const { imgs, name, price, descr, _id } = productData
    // const img = imgs[0]
    // const transformedName = onTransformString(name)

    // const handleImageError: ReactEventHandler<HTMLImageElement> = (event) => {
    //     event.currentTarget.src = './icons/noImage.jpg'
    // }

    return (
        <div className="buy-card buy-card-line">
            {/* <div className="buy-card_info">
                <div className="buy-card_info_img">
                    <img
                        src={img}
                        onError={handleImageError}
                        alt={transformedName}
                    />
                </div>
                <div className="buy-card_info_descr">
                    <div className="buy-card_info_descr_code">
                        <span>Артикул: </span>
                        {_id}
                    </div>
                    <div className="buy-card_info_descr_name">
                        <span> {transformedName}</span>
                        <br />
                        {descr}
                    </div>
                </div>
            </div>
            <div className="buy-card_functional">
                <div className="buy-card_functional_price">Цена за 1шт.:</div>
                <div className="buy-card_functional_more-less">{price} ₴</div>
                <div className="buy-card_functional_price_summary">
                    <button className="button button_card-line">
                        В корзину
                    </button>
                </div>
            </div> */}
        </div>
    )
}

export default ItemLine
