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
            src: './contentDB/imgs/storeitems/item1.jpg',
            alt: 'ball popular',
        },
        rate: 2,
        price: 300,
        prevPrice: 450,
    },
    {
        name: 'Фитбол, мяч гимнастический, размер 55 см',
        img: {
            src: './contentDB/imgs/storeitems/item1.jpg',
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
        rate: 2,
        price: 300,
        prevPrice: 400,
    },
    {
        name: 'Фитбол, мяч гимнастический, размер 55 см',
        img: {
            src: './contentDB/imgs/storeitems/item1.jpg',
            alt: 'ball popular',
        },
        rate: 3,
        price: 300,
        prevPrice: 400,
    },
    {
        name: 'Фитбол, мяч гимнастический, размер 55 см',
        img: {
            src: './contentDB/imgs/storeitems/item1.jpg',
            alt: 'ball popular',
        },
        rate: 3,
        price: 300,
        prevPrice: 400,
    },
    {
        name: 'Фитбол, мяч гимнастический, размер 55 см',
        img: {
            src: './contentDB/imgs/storeitems/item1.jpg',
            alt: 'ball popular',
        },
        rate: 1,
        price: 300,
        prevPrice: 400,
    },
    {
        name: 'Фитбол, мяч гимнастический, размер 55 см',
        img: {
            src: './contentDB/imgs/storeitems/item1.jpg',
            alt: 'ball popular',
        },
        rate: 3,
        price: 300,
        prevPrice: 400,
    },
    {
        name: 'Фитбол, мяч гимнастический, размер 55 см',
        img: {
            src: './contentDB/imgs/storeitems/item1.jpg',
            alt: 'ball popular',
        },
        rate: 1,
        price: 300,
        prevPrice: 400,
    },
]

const PopularPosition = () => {
    // const onBuildItemsList = (cardsArray: ItemDataInterface[]) => {
    //     return cardsArray.map((card) => {
    //         return ItemCard(card)
    //     })
    // }
    const [itemDataIndex, setItemDataIndex] = useState(0)
    const onBuildItemsList = (
        cardsArray: ItemDataInterface[],
        itemDataIndex: number
    ) => {
        const content = []
        for (let cardNum = 0; cardNum < 4; cardNum++) {
            const cardIndex = cardNum + itemDataIndex
            if (cardIndex >= cardsArray.length) break

            const cardData: ItemDataInterface = cardsArray[cardIndex]
            content.push(ItemCard(cardData, cardIndex))
        }
        return content
    }

    return (
        <section className="popular-items">
            <div className="container">
                <h2 className="section-header">Популярные товары</h2>
                <div className="popular-items_wrapper">
                    {onBuildItemsList(popularPositionsData, itemDataIndex)}
                </div>
            </div>
        </section>
    )
}

export default PopularPosition
