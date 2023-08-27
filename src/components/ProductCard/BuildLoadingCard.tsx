import './productCard.scss'
import { RateStars } from '../rateStars/RateStars'

export const BuildLoadingCard = () => {
    return (
        <div className="item-card item-card_loading">
            <div className="item-card_img item-card_img_loading"></div>
            <div className="item-card_wrapper">
                <RateStars rate={0} />
                <h4 className="item-card_name"></h4>
                <div className="item-card_price">
                    <div className="item-card_price_usualy"> </div>
                    <div className="item-card_price_basket"></div>
                </div>
            </div>
        </div>
    )
}
