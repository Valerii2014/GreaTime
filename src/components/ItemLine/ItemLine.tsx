import './itemLine.scss'

import { useDispatch } from 'react-redux'

import {
    addProductToShopCart,
    delProductFromShopCart,
} from '../../store/appSlice/userSlice'
import { useAppSelector } from '../../store'
import { Product } from '../../store/appSlice/productsSlice'

import { handleImageError } from '../../utils/handleImageError'
import { onTransformString } from '../../utils/stringTransformer'

interface ItemLineProps {
    productData: Product
}

const ItemLine = (props: ItemLineProps) => {
    const dispatch = useDispatch()
    const cartData = useAppSelector((state) => state.user.shopCart)

    const { productData } = props
    const { imgs, name, price, descr, _id } = productData
    const img = imgs[0]
    const transformedName = onTransformString(name)

    const isProductInShopCart =
        cartData && cartData.length > 0
            ? cartData.some((product) => product[0] === _id && product[1] !== 0)
            : false

    const buttonCB = isProductInShopCart
        ? () => dispatch(delProductFromShopCart(_id))
        : () => dispatch(addProductToShopCart(_id))

    const buttonText = isProductInShopCart ? 'Убрать из корзины' : 'В корзину'

    return (
        <div className="buy-card buy-card-line">
            <div className="buy-card_info">
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
                    <button
                        className={`button button_card-line`}
                        onClick={buttonCB}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ItemLine
