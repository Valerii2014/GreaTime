import AppHeader from '../components/AppHeader/AppHeader'
import PromoSlider from '../components/PromoSlider/PromoSlider'
import CategoryCards from '../components/CategoryCards/CategoryCards'
import PopularPosition from '../components/PopularPositions/PopularPositions'
import Benefits from '../components/Benefits/Benefits'
import Connection from '../components/Connection/Connection'
import Partners from '../components/Partners/Partners'
import Footer from '../components/Footer/Footer'

import { ItemDataInterface } from '../components/ItemCard/ItemCard'
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

const PreviousPage = () => {
    return (
        <>
            <PromoSlider />
            <div className="container">
                <CategoryCards />
                {PopularPosition(popularPositionsData)}
                <Benefits />
                <Connection />
                <Partners />
            </div>
        </>
    )
}

export default PreviousPage
