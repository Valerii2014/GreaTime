import './productCard.scss'

import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../store'
import { Position } from '../../store/appSlice/positionsSlice'
import {
    addProductToShopCart,
    removeProduct,
} from '../../store/appSlice/userSlice'

import { onTransformName } from '../../utils/stringTransformer'
import getItemPercentSale from '../../utils/getPercentSale'
import { onTransformPrice } from '../../utils/stringTransformer'
import { handleImageError } from '../../utils/handleImageError'
import { RateStars } from '../rateStars/RateStars'

export const BuildCard = (props: Position) => {
    const dispatch = useDispatch()
    const cartData = useAppSelector((state) => state.user.shopCart)

    const { imgs, rate, name, price, prevPrice, _id } = props
    const img = imgs[0]

    const isProductInShopCart =
        cartData && cartData.length > 0
            ? cartData.some((product) => product[0] === _id && product[1] !== 0)
            : false

    const buttonCB = isProductInShopCart
        ? () => dispatch(removeProduct(_id))
        : () => dispatch(addProductToShopCart(_id))

    const getStyledPrice = (price: number, prevPrice?: number) => {
        if (prevPrice) {
            return (
                <div className="item-card_price_sale">
                    {onTransformPrice(price)} ₴
                    <span className="item-card_price_sale_before">
                        {onTransformPrice(prevPrice)} ₴
                    </span>
                </div>
            )
        } else {
            return (
                <div className="item-card_price_usualy">
                    {onTransformPrice(price)} ₴
                </div>
            )
        }
    }

    const inCartClass = isProductInShopCart ? 'button_buy' : ''

    return (
        <div className="item-card">
            {prevPrice ? (
                <div className="item-card_percent-sale">
                    {getItemPercentSale(price, prevPrice)}%
                </div>
            ) : null}
            <img
                src="./icons/system/favorite.svg"
                alt="favorite"
                className="item-card_favorite"
            />
            <div className="item-card_img">
                <img src={img} onError={handleImageError} alt={name} />
            </div>
            <div className="item-card_wrapper">
                <RateStars rate={rate} />
                <h4 className="item-card_name">{onTransformName(name)}</h4>
                <div className="item-card_price">
                    {getStyledPrice(price, prevPrice)}
                    <div
                        className={`item-card_price_basket ${inCartClass}`}
                        onClick={buttonCB}
                    >
                        <img src="./icons/system/buy-white.svg" alt="buy" />
                    </div>
                </div>
            </div>
        </div>
    )
}
