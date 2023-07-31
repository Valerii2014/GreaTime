import './popularPositions.scss'

import { useState, useRef, useEffect, useMemo, Fragment } from 'react'
import { ItemCard, ItemDataInterface } from '../ItemCard/ItemCard'
import changeSlideFunctionCreator from '../../utils/changeSlideFunctionCreator'

const popularPositionsData: ItemDataInterface[] = [
    {
        name: 'Фитбол, мяч гимнастический, размер 55 см',
        img: {
            src: './contentDB/imgs/storeitems/item1.jpg',
            alt: 'ball popular',
        },
        rate: 5,
        price: 330,
        prevPrice: 550,
    },
    {
        name: 'Фитбол, мяч гимнастический, размер 55 см',
        img: {
            src: './contentDB/imgs/storeitems/item2.jpg',
            alt: 'ball popular',
        },
        rate: 2,
        price: 300,
        prevPrice: 450,
    },
    {
        name: 'Фитбол, мяч гимнастический, размер 55 см',
        img: {
            src: './contentDB/imgs/storeitems/item4.jpg',
            alt: 'ball popular',
        },
        rate: 3,
        price: 150,
        prevPrice: 220,
    },
    {
        name: 'Фитбол, мяч гимнастический, размер 55 см',
        img: {
            src: './contentDB/imgs/storeitems/item3.jpg',
            alt: 'ball popular',
        },
        rate: 1,
        price: 300,
        prevPrice: 700,
    },
    {
        name: 'Фитбол, мяч гимнастический, размер 55 см',
        img: {
            src: './contentDB/imgs/storeitems/item1.jpg',
            alt: 'ball popular',
        },
        rate: 3,
        price: 300,
        prevPrice: 900,
    },
    {
        name: 'Фитбол, мяч гимнастический, размер 55 см',
        img: {
            src: './contentDB/imgs/storeitems/item2.jpg',
            alt: 'ball popular',
        },
        rate: 1,
        price: 300,
        prevPrice: 600,
    },
    {
        name: 'Фитбол, мяч гимнастический, размер 55 см',
        img: {
            src: './contentDB/imgs/storeitems/item3.jpg',
            alt: 'ball popular',
        },
        rate: 1,
        price: 360,
        prevPrice: 400,
    },
    {
        name: 'Фитбол, мяч гимнастический, размер 55 см',
        img: {
            src: './contentDB/imgs/storeitems/item1.jpg',
            alt: 'ball popular',
        },
        rate: 3,
        price: 390,
        prevPrice: 400,
    },
    {
        name: 'Фитбол, мяч гимнастический, размер 55 см',
        img: {
            src: './contentDB/imgs/storeitems/item3.jpg',
            alt: 'ball popular',
        },
        rate: 3,
        price: 330,
    },
    {
        name: 'Фитбол, мяч гимнастический, размер 55 см',
        img: {
            src: './contentDB/imgs/storeitems/item1.jpg',
            alt: 'ball popular',
        },
        rate: 1,
        price: 359,
        prevPrice: 400,
    },
    {
        name: 'Фитбол, мяч гимнастический, размер 55 см',
        img: {
            src: './contentDB/imgs/storeitems/item1.jpg',
            alt: 'ball popular',
        },
        rate: 5,
        price: 300,
        prevPrice: 320,
    },
    {
        name: 'Фитбол, мяч гимнастический, размер 55 см',
        img: {
            src: './contentDB/imgs/storeitems/item4.jpg',
            alt: 'ball popular',
        },
        rate: 3,
        price: 220,
        prevPrice: 400,
    },
]

const PopularPosition = () => {
    const animationTimeMilliseconds = 900
    const [sliderPosition, setSliderPosition] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const sliderChangeInterval = setInterval(() => {
            if (isAnimating) {
                setTimeout(
                    () => onChangeSlide('next'),
                    animationTimeMilliseconds
                )
            }
            onChangeSlide('next')
        }, 4000)

        return () => {
            clearInterval(sliderChangeInterval)
        }
    }, [isAnimating])

    const onBuildSliderImage = (cardsArray: ItemDataInterface[]) => {
        const allSliderImages: JSX.Element[] = []
        let sliderImage: JSX.Element[] = []
        cardsArray.forEach((card, index) => {
            sliderImage.push(<>{ItemCard(card, card.name)}</>)
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
    const Images = onBuildSliderImage(popularPositionsData)

    const sliderImages = (Images: JSX.Element[]) => {
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

    const sliderContent = useMemo(
        () => sliderImages(Images),
        [popularPositionsData]
    )
    const sliderDots = onBuildItemDots(Images)

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
