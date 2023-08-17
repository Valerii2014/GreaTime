const onTransformString = (string: string): string => {
    return string[0].toUpperCase() + string.toLowerCase().slice(1)
}
const onTransformName = (itemName: string): string => {
    if (itemName.length >= 55) {
        return `${itemName.slice(0, 55)}...`
    }
    return itemName
}

export { onTransformName, onTransformString }
