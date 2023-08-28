const changeSlideFunctionCreator = (
    sliderRef: React.RefObject<HTMLDivElement>,
    sliderProduct: number,
    setSliderProduct: React.Dispatch<React.SetStateAction<number>>,
    isAnimating: boolean,
    setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>,
    sliderContentLength: number,
    animationTimeMilliseconds: number
) => {
    return (move: 'prev' | 'next', choisedProduct?: number) => {
        if (isAnimating) return

        setIsAnimating(true)
        if (move === 'next') {
            const newProduct = choisedProduct
                ? choisedProduct
                : sliderProduct + 1 >= sliderContentLength
                ? 0
                : sliderProduct + 1

            const children = sliderRef.current?.children

            if (children instanceof HTMLCollection) {
                const hidingElement = children[sliderProduct] as HTMLElement
                const showingElement = children[newProduct] as HTMLElement
                if (hidingElement && showingElement) {
                    for (let i = 0; i < children.length; i++) {
                        const hidingElement = children[i] as HTMLElement
                        hidingElement.classList.remove(
                            'showSlideRight',
                            'hideSlideLeft',
                            'hideSlideRight',
                            'showSlideLeft'
                        )
                        hidingElement.classList.add('hide')
                    }
                    showingElement.classList.remove('hide')
                    hidingElement.classList.remove('hide')
                    showingElement.classList.add('showSlideRight')
                    hidingElement.classList.add('hideSlideLeft')
                    setSliderProduct(
                        (sliderProduct) => (sliderProduct = newProduct)
                    )
                }
            }
        } else if (move === 'prev') {
            const newProduct =
                typeof choisedProduct === 'number'
                    ? choisedProduct
                    : sliderProduct - 1 < 0
                    ? sliderContentLength - 1
                    : sliderProduct - 1

            const children = sliderRef.current?.children

            if (children instanceof HTMLCollection) {
                const hidingElement = children[sliderProduct] as HTMLElement
                const showingElement = children[newProduct] as HTMLElement
                if (hidingElement && showingElement) {
                    for (let i = 0; i < children.length; i++) {
                        const hidingElement = children[i] as HTMLElement
                        hidingElement.classList.remove(
                            'showSlideRight',
                            'hideSlideLeft',
                            'hideSlideRight',
                            'showSlideLeft'
                        )
                        hidingElement.classList.add('hide')
                    }
                    showingElement.classList.remove('hide')
                    hidingElement.classList.remove('hide')
                    showingElement.classList.add('showSlideLeft')
                    hidingElement.classList.add('hideSlideRight')

                    setSliderProduct(
                        (sliderProduct) => (sliderProduct = newProduct)
                    )
                }
            }
        }
        setTimeout(() => setIsAnimating(false), animationTimeMilliseconds)
    }
}

export default changeSlideFunctionCreator
