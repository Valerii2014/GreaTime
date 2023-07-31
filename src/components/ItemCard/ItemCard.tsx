import './itemCard.scss'

type ItemDataRate = 1 | 2 | 3 | 4 | 5

interface ItemDataImg {
    src: string
    alt: string
}
export interface ItemDataInterface {
    name: string
    img: ItemDataImg
    rate: ItemDataRate
    price: number
    prevPrice?: number
}

const ItemCard = (itemData: ItemDataInterface, key: number | string) => {
    const { img, rate, name, price, prevPrice } = itemData

    const onTransformName = (itemName: string): string => {
        if (itemName.length >= 55) {
            return `${itemName.slice(0, 55)}...`
        }
        return itemName
    }

    const getItemPercentSale = (price: number, prevPrice: number): number => {
        if (prevPrice) {
            return Math.floor((prevPrice - price) / (prevPrice / 100))
        }
        return NaN
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
        <div className="item-card" key={key}>
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
                <img src={img.src} alt={img.alt} />
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
