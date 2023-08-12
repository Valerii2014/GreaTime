import './itemCard.scss'
import { Position } from '../../store/appSlice/positionsSlice'
import { ReactEventHandler } from 'react'
import { onTransformName } from '../../utils/stringTransformer'
import getItemPercentSale from '../../utils/getPercentSale'

const ItemCard = (itemData: Position) => {
    const { imgs, rate, name, price, prevPrice, _id } = itemData
    const img = imgs[0]

    const handleImageError: ReactEventHandler<HTMLImageElement> = (event) => {
        event.currentTarget.src = './icons/noImage.jpg'
    }

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
                    ></img>
                )
                starIndex++
            } else {
                starArr.push(
                    <img
                        src="./icons/system/star2.svg"
                        alt="star2"
                        className="item-card_rate_img"
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
    return (
        <div className="item-card" key={_id}>
            {prevPrice ? (
                <div className="item-card_percent-sale">
                    {getItemPercentSale(itemData)}%
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
                <div className="item-card_price_basket">
                    <img src="./icons/system/buy-white.svg" alt="buy" />
                </div>
            </div>
        </div>
    )
}

export { ItemCard }
