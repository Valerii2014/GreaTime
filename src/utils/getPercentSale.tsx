import { Position } from '../store/appSlice/positionsSlice'

const getItemPercentSale = (item: Position): number => {
    if (item.prevPrice) {
        return Math.floor(
            (item.prevPrice - item.price) / (item.prevPrice / 100)
        )
    }
    return 0
}

export default getItemPercentSale
