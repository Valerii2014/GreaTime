const onTransformString = (string: string): string => {
    return string[0].toUpperCase() + string.toLowerCase().slice(1)
}
const onTransformName = (itemName: string): string => {
    if (itemName.length >= 55) {
        return `${itemName.slice(0, 55)}...`
    }
    return itemName
}

const onTransformPrice = (price: number) => {
    const priceTransf = price.toString().split('').reverse()
    const priceWithSpace = []
    for (let i = 0; i < priceTransf.length; i++) {
        if (i % 3 !== 0) {
            priceWithSpace.push(priceTransf[i])
        } else priceWithSpace.push(`${priceTransf[i]} `)
    }
    return priceWithSpace.reverse().join('')
}

export { onTransformName, onTransformString, onTransformPrice }
