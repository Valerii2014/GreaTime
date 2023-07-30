import './infinitySlider.scss'

import { useMemo, useState, useRef, Fragment } from 'react'

const InfinitySlider = (sliderContent: JSX.Element[], className?: string) => {
    const [sliderPosition, setSliderPosition] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)
    const addedClassName = className ? className : ''

    const onChangeSlide = (move: 'prev' | 'next', choisedPosition?: number) => {
        if (isAnimating) return
        setIsAnimating(true)
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
                    showingElement.classList.add('hideSlideLeft')
                    hidingElement.classList.add('showSlideRight')
                    setSliderPosition(
                        (sliderPosition) => (sliderPosition = newPosition)
                    )
                }
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
                    showingElement.classList.add('hideSlideRight')
                    hidingElement.classList.add('showSlideLeft')
                    setSliderPosition(
                        (sliderPosition) => (sliderPosition = newPosition)
                    )
                }
            }
        }

        setTimeout(() => setIsAnimating(false), 900)
    }

    const onBuildSliderImage = (data: JSX.Element[]) => {
        return (
            <div
                className={`${className ? className : ''}slider_images`}
                ref={sliderRef}
            >
                {data.map((slide, index) => (
                    <div
                        className={`${
                            className ? className : ''
                        }slider_images_image ${
                            index === sliderPosition ? '' : 'hide'
                        }`}
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
            <div className={`${className ? className : ''}slider_dots`}>
                {sliderContent.map((slide, num) => {
                    return (
                        <span
                            key={num}
                            className={`${addedClassName}slider_dots_item ${
                                num === sliderPosition
                                    ? `${addedClassName}slider_dots_item_active`
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
        <section className={`${addedClassName}slider`}>
            <div className="container">
                <div className={`${addedClassName}slider_wrapper`}>
                    {sliderImages}

                    <div className={`${addedClassName}slider_btn`}>
                        <div
                            className={`${addedClassName}slider_btn_prev`}
                            onClick={() => onChangeSlide('prev')}
                        >
                            <img
                                src="./icons/system/arrowBlue.svg"
                                alt="prev"
                            />
                        </div>
                        <div
                            className={`${addedClassName}slider_btn_next`}
                            onClick={() => onChangeSlide('next')}
                        >
                            <img
                                src="./icons/system/arrowBlue.svg"
                                alt="prev"
                            />
                        </div>
                    </div>
                    {onBuildSliderDots(sliderContent)}
                </div>
            </div>
        </section>
    )
}

export default InfinitySlider
