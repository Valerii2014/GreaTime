import './popularPositions.scss'

import { ItemCard, ItemDataInterface } from '../ItemCard/ItemCard'
import { useState } from 'react'

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
    const [itemDataIndex, setItemDataIndex] = useState(0)
    const [cardsMove, setCardsMove] = useState('next')

    const onBuildItemsList = (
        cardsArray: ItemDataInterface[],
        itemDataIndex: number
    ) => {
        const content = []
        const moveClass =
            cardsMove === 'prev' ? 'cards cards_left' : 'cards cards_right'
        for (let cardNum = 0; cardNum < 4; cardNum++) {
            const cardIndex = cardNum + itemDataIndex
            if (cardIndex >= cardsArray.length) break

            const cardData: ItemDataInterface = cardsArray[cardIndex]
            content.push(ItemCard(cardData, cardIndex))
        }
        return (
            <div key={itemDataIndex} className={moveClass}>
                {content}
            </div>
        )
    }

    const onChangeIndex = (move: 'prev' | 'next') => {
        if (move === 'next') {
            const newIndex = itemDataIndex + 4
            if (newIndex >= popularPositionsData.length) {
                setItemDataIndex(0)
            } else {
                setItemDataIndex(newIndex)
            }
        } else if (move === 'prev') {
            const newIndex = itemDataIndex - 4
            if (newIndex < 0) {
                const remainder = popularPositionsData.length % 4
                if (remainder === 0) {
                    setItemDataIndex(popularPositionsData.length - 4)
                } else {
                    setItemDataIndex(popularPositionsData.length - remainder)
                }
            } else {
                setItemDataIndex(newIndex)
            }
        }
        setCardsMove(move)
    }

    const getItemPositions = (dataArray: ItemDataInterface[]) => {
        let index = (dataArray.length - 1) / 4
        if ((dataArray.length - 1) % 4 !== 0) index++
        return index
    }

    const onBuildItemDots = (data: ItemDataInterface[]) => {
        const dots = []
        for (let i = 0; i <= data.length - 1; i = i + 4) {
            const dot = (
                <span
                    key={i}
                    className={`popular-items_dots_item ${
                        itemDataIndex === i
                            ? 'popular-items_dots_item_active'
                            : null
                    }`}
                    onClick={() => {
                        i > itemDataIndex
                            ? setCardsMove('next')
                            : setCardsMove('prev')
                        setItemDataIndex(i)
                    }}
                />
            )
            dots.push(dot)
        }
        return <div className="popular-items_dots">{dots}</div>
    }

    return (
        <section className="popular-items">
            <div className="container">
                <h2 className="section-header">Популярные товары</h2>

                <div className="popular-items_wrapper">
                    <div className="popular-items_wrapper_cards">
                        {onBuildItemsList(popularPositionsData, itemDataIndex)}
                    </div>
                    <div
                        className="popular-items_btns popular-items_btns_prev"
                        onClick={() => onChangeIndex('prev')}
                    >
                        <img
                            src="./icons/system/arrowWhite.svg"
                            alt="prev"
                        ></img>
                    </div>
                    <div
                        className="popular-items_btns popular-items_btns_next"
                        onClick={() => onChangeIndex('next')}
                    >
                        <img
                            src="./icons/system/arrowWhite.svg"
                            alt="next"
                        ></img>
                    </div>
                    {onBuildItemDots(popularPositionsData)}
                </div>
            </div>
        </section>
    )
}

export default PopularPosition
