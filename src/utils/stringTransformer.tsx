const onTransformString = (string: string): string => {
    return string[0].toUpperCase() + string.toLowerCase().slice(1)
}

export default onTransformString
