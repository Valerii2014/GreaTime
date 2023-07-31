import './infinitySlider.scss'

import { useMemo, useState, useRef, Fragment } from 'react'

const InfinitySlider = (
    sliderContent: JSX.Element[],
    addedClassName: string = 'slider'
) => {
    const [sliderPosition, setSliderPosition] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)

    const onChangeSlide = (move: 'prev' | 'next', choisedPosition?: number) => {
        // if (isAnimating) return
        // setIsAnimating(true)
        if (move === 'next') {
            const newPosition = choisedPosition
                ? choisedPosition
                : sliderPosition + 1 >= sliderContent.length
                ? 0
                : sliderPosition + 1

            const children = sliderRef.current?.children

            if (children instanceof HTMLCollection) {
                const hidingElement = children[sliderPosition] as HTMLElement
                const showingElement = children[newPosition] as HTMLElement
                if (hidingElement && showingElement) {
                    for (let i = 0; i < children.length; i++) {
                        if (i === sliderPosition || i === newPosition) return
                        const element = children[i] as HTMLElement
                        element.setAttribute('visibility', 'hide')
                    }
                    showingElement.setAttribute('visibility', 'showSlideRight')
                    hidingElement.setAttribute('visibility', 'hideSlideLeft')
                    setSliderPosition(
                        (sliderPosition) => (sliderPosition = newPosition)
                    )
                }
                // setTimeout(() => setIsAnimating(false), 900)
            }
        } else if (move === 'prev') {
            const newPosition =
                typeof choisedPosition === 'number'
                    ? choisedPosition
                    : sliderPosition - 1 < 0
                    ? sliderContent.length - 1
                    : sliderPosition - 1

            const children = sliderRef.current?.children

            if (children instanceof HTMLCollection) {
                const hidingElement = children[sliderPosition] as HTMLElement
                const showingElement = children[newPosition] as HTMLElement
                if (hidingElement && showingElement) {
                    for (let i = 0; i < children.length; i++) {
                        const hidingElement = children[i] as HTMLElement
                        hidingElement.setAttribute('visibility', 'hide')
                    }
                    showingElement.setAttribute('visibility', 'showSlideLeft')
                    hidingElement.setAttribute('visibility', 'hideSlideRight')
                    setSliderPosition(
                        (sliderPosition) => (sliderPosition = newPosition)
                    )
                }
                // setTimeout(() => setIsAnimating(false), 900)
            }
        }
    }

    const onBuildSliderImage = (data: JSX.Element[]) => {
        return (
            <div className={`${addedClassName}_images`} ref={sliderRef}>
                {data.map((slide, index) => (
                    <div
                        className={`${addedClassName}_images_image`}
                        key={index}
                    >
                        {slide}
                    </div>
                ))}
            </div>
        )
    }

    const onBuildSliderDots = (sliderContent: JSX.Element[]) => {
        return (
            <div className={`${addedClassName}_dots`}>
                {sliderContent.map((slide, num) => {
                    return (
                        <span
                            key={num}
                            className={`${addedClassName}_dots_item ${
                                num === sliderPosition
                                    ? `${addedClassName}_dots_item_active`
                                    : null
                            }`}
                            onClick={() => {
                                if (num > sliderPosition)
                                    onChangeSlide('next', num)
                                else if (num < sliderPosition)
                                    onChangeSlide('prev', num)
                                else return
                            }}
                        ></span>
                    )
                })}
            </div>
        )
    }
    const sliderImages = useMemo(
        () => onBuildSliderImage(sliderContent),
        [sliderContent]
    )
    return (
        <section className={`${addedClassName}`}>
            <div className="container">
                <div className={`${addedClassName}_wrapper`}>
                    {sliderImages}

                    <div
                        className={`${addedClassName}_btn_prev`}
                        onClick={() => onChangeSlide('prev')}
                    >
                        <img src="./icons/system/arrowBlue.svg" alt="prev" />
                    </div>
                    <div
                        className={`${addedClassName}_btn_next`}
                        onClick={() => onChangeSlide('next')}
                    >
                        <img src="./icons/system/arrowBlue.svg" alt="prev" />
                    </div>

                    {onBuildSliderDots(sliderContent)}
                </div>
            </div>
        </section>
    )
}

export default InfinitySlider
