import './rateStars.scss'

interface RateStarsProps {
    rate: number
}

export const RateStars = (props: RateStarsProps) => {
    const { rate } = props
    const starArr = []
    let starIndex = 0
    for (let star = 0; star < 5; star++) {
        if (starIndex < rate) {
            starArr.push(
                <img
                    src="./icons/system/star1.svg"
                    alt="star1"
                    className="star-item"
                    key={star}
                ></img>
            )
            starIndex++
        } else {
            starArr.push(
                <img
                    src="./icons/system/star2.svg"
                    alt="star2"
                    className="star-item"
                    key={star}
                ></img>
            )
        }
    }
    return <div className="stars-container">{starArr}</div>
}
