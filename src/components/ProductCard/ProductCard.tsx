import './productCard.scss'
import { Position } from '../../store/appSlice/positionsSlice'
import { ReactEventHandler, FC } from 'react'
import { useDispatch } from 'react-redux'
import { onTransformName } from '../../utils/stringTransformer'
import getItemPercentSale from '../../utils/getPercentSale'
import { useAppSelector } from '../../store'
import { addProductToShopCart } from '../../store/appSlice/userSlice'

export interface ProductCardProps {
    productData: Position | {}
}

const ProductCard = (props: ProductCardProps) => {
    const { productData } = props

    return (
        <>
            {'_id' in productData ? (
                <OnBuildCard {...productData} />
            ) : (
                <OnBuildLoadingCard />
            )}
        </>
    )
}

export default ProductCard

const OnBuildCard = (props: Position) => {
    const dispatch = useDispatch()
    const cartData = useAppSelector((state) => state.user.shopCart)

    const { imgs, rate, name, price, prevPrice, _id } = props
    const img = imgs[0]

    const isProductInShopCart =
        cartData && cartData.length > 0
            ? cartData.some((product) => product[0] === _id)
            : false

    const handleImageError: ReactEventHandler<HTMLImageElement> = (event) => {
        event.currentTarget.src = './icons/noImage.jpg'
    }

    const addProductToCart = () => dispatch(addProductToShopCart(_id))

    const getRateStars = (rate: number) => {
        const starArr = []
        let starIndex = 0
        for (let star = 0; star < 5; star++) {
            if (starIndex < rate) {
                starArr.push(
                    <img
                        src="./icons/system/star1.svg"
                        alt="star1"
                        className="item-card_rate_img"
                        key={star}
                    ></img>
                )
                starIndex++
            } else {
                starArr.push(
                    <img
                        src="./icons/system/star2.svg"
                        alt="star2"
                        className="item-card_rate_img"
                        key={star}
                    ></img>
                )
            }
        }
        return starArr
    }

    const getStyledPrice = (price: number, prevPrice?: number) => {
        if (prevPrice) {
            return (
                <div className="item-card_price_sale">
                    {price} ₴
                    <span className="item-card_price_sale_before">
                        {prevPrice} ₴
                    </span>
                </div>
            )
        } else {
            return <div className="item-card_price_usualy">{price} ₴</div>
        }
    }

    const basketClass = isProductInShopCart ? 'button_buy' : ''

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
            <div className="item-card_rate">{getRateStars(rate)}</div>
            <h4 className="item-card_name">{onTransformName(name)}</h4>
            <div className="item-card_price">
                {getStyledPrice(price, prevPrice)}
                <div
                    className={`item-card_price_basket ${basketClass}`}
                    onClick={addProductToCart}
                >
                    <img src="./icons/system/buy-white.svg" alt="buy" />
                </div>
            </div>
        </div>
    )
}

const OnBuildLoadingCard = () => {
    return (
        <div className="item-card item-card_loading">
            <div className="item-card_img item-card_img_loading"></div>
            <div className="item-card_rate">
                <img
                    src="./icons/system/star2.svg"
                    alt="star2"
                    className="item-card_rate_img"
                ></img>
                <img
                    src="./icons/system/star2.svg"
                    alt="star2"
                    className="item-card_rate_img"
                ></img>
                <img
                    src="./icons/system/star2.svg"
                    alt="star2"
                    className="item-card_rate_img"
                ></img>
                <img
                    src="./icons/system/star2.svg"
                    alt="star2"
                    className="item-card_rate_img"
                ></img>
                <img
                    src="./icons/system/star2.svg"
                    alt="star2"
                    className="item-card_rate_img"
                ></img>
            </div>
            <h4 className="item-card_name"></h4>
            <div className="item-card_price">
                <div className="item-card_price_usualy"> </div>
                <div className="item-card_price_basket"></div>
            </div>
        </div>
    )
}
