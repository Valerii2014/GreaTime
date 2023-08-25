const getItemPercentSale = (price: number, prevPrice: number): number => {
    if (prevPrice) {
        return Math.floor((prevPrice - price) / (prevPrice / 100))
    }
    return 0
}

export default getItemPercentSale
