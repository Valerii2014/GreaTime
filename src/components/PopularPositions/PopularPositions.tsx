import './popularPositions.scss'

import { useState, useRef, useEffect, useMemo, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { ItemCard } from '../ItemCard/ItemCard'
import changeSlideFunctionCreator from '../../utils/changeSlideFunctionCreator'
import { Position, PositionsData } from '../../store/appSlice/positionsSlice'
import { useGetRandomPositionsQuery } from '../../services/positionsApi'

const PopularPosition = () => {
    const dispatch = useDispatch()
    const animationTimeMilliseconds = 900
    const [sliderPosition, setSliderPosition] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)

    const { data, isLoading, isError } = useGetRandomPositionsQuery(20)

    useEffect(() => {
        const sliderChangeInterval = setInterval(() => {
            if (isAnimating) {
                setTimeout(
                    () => onChangeSlide('next'),
                    animationTimeMilliseconds
                )
            }
            onChangeSlide('next')
        }, 4500)

        return () => {
            clearInterval(sliderChangeInterval)
        }
    }, [isAnimating])

    const onBuildSliderImage = (cardsArray: PositionsData) => {
        const allSliderImages: JSX.Element[] = []
        let sliderImage: JSX.Element[] = []
        cardsArray.forEach((card, index) => {
            sliderImage.push(<>{ItemCard(card)}</>)
            if ((index + 1) % 4 === 0) {
                allSliderImages.push(
                    <div className="cards" key={allSliderImages.length}>
                        {sliderImage}
                    </div>
                )
                sliderImage = []
            } else if (index + 1 === cardsArray.length) {
                allSliderImages.push(
                    <Fragment key={index}>{sliderImage}</Fragment>
                )
            }
        })
        return allSliderImages
    }
    const Images = data ? onBuildSliderImage(data) : []

    const sliderImages = (Images: JSX.Element[] | null) => {
        if (!Images) return null
        return (
            <div className="popular-items_wrapper_cards" ref={sliderRef}>
                {Images.map((image, index) => {
                    return (
                        <div
                            className={`cards ${
                                index === sliderPosition ? '' : 'hide'
                            }`}
                            key={index}
                        >
                            {image}
                        </div>
                    )
                })}
            </div>
        )
    }

    const onChangeSlide = changeSlideFunctionCreator(
        sliderRef,
        sliderPosition,
        setSliderPosition,
        isAnimating,
        setIsAnimating,
        Images.length,
        animationTimeMilliseconds
    )

    const onBuildItemDots = (Images: JSX.Element[]) => {
        return (
            <div className="popular-items_dots">
                {Images.map((slide, index) => {
                    return (
                        <span
                            key={index}
                            className={`popular-items_dots_item ${
                                sliderPosition === index
                                    ? 'popular-items_dots_item_active'
                                    : ''
                            }`}
                            onClick={() => {
                                index > sliderPosition
                                    ? onChangeSlide('next', index)
                                    : onChangeSlide('prev', index)
                            }}
                        ></span>
                    )
                })}
            </div>
        )
    }

    const sliderContent = useMemo(() => sliderImages(Images), [data])
    const sliderDots = Images ? onBuildItemDots(Images) : null

    return (
        <section className="popular-items">
            <h2 className="section-header">Популярные товары</h2>

            <div className="popular-items_wrapper">
                {sliderContent}
                <div
                    className="popular-items_btns popular-items_btns_prev"
                    onClick={() => onChangeSlide('prev')}
                >
                    <img src="./icons/system/arrowWhite.svg" alt="prev"></img>
                </div>
                <div
                    className="popular-items_btns popular-items_btns_next"
                    onClick={() => onChangeSlide('next')}
                >
                    <img src="./icons/system/arrowWhite.svg" alt="next"></img>
                </div>
                {sliderDots}
            </div>
        </section>
    )
}

export default PopularPosition
