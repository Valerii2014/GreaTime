import './catalogPositionsGrid.scss'
import { ItemDataInterface, ItemCard } from '../ItemCard/ItemCard'

interface SubcategoriesItem {
    categories: string
    positions: ItemDataInterface[]
    subcategories?: SubcategoriesItem[]
}

interface categoriesItem {
    categories: string
    positions?: ItemDataInterface[]
    subcategories?: SubcategoriesItem[]
}
const catalogItems: categoriesItem[] = [
    {
        categories: 'Обувь',
        subcategories: [
            {
                categories: 'Мужская обувь',
                positions: [
                    {
                        name: 'Кроссовки',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Кроссовки',
                        },
                        rate: 4,
                        price: 2000,
                        prevPrice: 2500,
                    },
                    {
                        name: 'Туфли',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Туфли',
                        },
                        rate: 5,
                        price: 2500,
                    },
                    {
                        name: 'Сандалии',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Сандалии',
                        },
                        rate: 3,
                        price: 1500,
                        prevPrice: 1800,
                    },
                ],
            },
            {
                categories: 'Женская обувь',
                positions: [
                    {
                        name: 'Балетки',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Балетки',
                        },
                        rate: 5,
                        price: 1800,
                    },
                    {
                        name: 'Ботинки',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Ботинки',
                        },
                        rate: 4,
                        price: 2800,
                        prevPrice: 3200,
                    },
                    {
                        name: 'Сапоги',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Сапоги',
                        },
                        rate: 5,
                        price: 3500,
                    },
                    // Добавьте здесь еще подкатегории для женской обуви
                ],
            },
            {
                categories: 'Детская обувь',
                positions: [
                    {
                        name: 'Кеды',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Кеды',
                        },
                        rate: 4,
                        price: 1200,
                        prevPrice: 1400,
                    },
                    {
                        name: 'Слипоны',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Слипоны',
                        },
                        rate: 3,
                        price: 1600,
                    },
                    {
                        name: 'Туфли',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Туфли',
                        },
                        rate: 4,
                        price: 1800,
                    },
                    // Добавьте здесь еще подкатегории для детской обуви
                ],
            },
            // Добавьте здесь еще подкатегории обуви, если необходимо
        ],
    },
    {
        categories: 'Одежда',
        subcategories: [
            {
                categories: 'Мужская Одежда',
                positions: [
                    {
                        name: 'Футболка',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Футболка',
                        },
                        rate: 3,
                        price: 25,
                    },
                    {
                        name: 'Джинсы',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Джинсы',
                        },
                        rate: 4,
                        price: 60,
                    },
                ],
            },
            {
                categories: 'Женская Одежда',
                positions: [
                    {
                        name: 'Платье',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Платье',
                        },
                        rate: 5,
                        price: 120,
                        prevPrice: 150,
                    },
                    {
                        name: 'Блузка',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Блузка',
                        },
                        rate: 2,
                        price: 40,
                    },
                ],
            },
            {
                categories: 'Мелочи',
                positions: [
                    {
                        name: 'Шапка',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Шапка',
                        },
                        rate: 4,
                        price: 500,
                    },
                    {
                        name: 'Перчатки',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Перчатки',
                        },
                        rate: 3,
                        price: 300,
                    },
                    {
                        name: 'Шарф',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Шарф',
                        },
                        rate: 5,
                        price: 400,
                    },
                ],
            },
        ],
    },
    {
        categories: 'Аксессуары',
        subcategories: [
            {
                categories: 'Сумки',
                positions: [
                    {
                        name: 'Женская сумка',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Женская сумка',
                        },
                        rate: 4,
                        price: 1500,
                    },
                    {
                        name: 'Мужская сумка',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Мужская сумка',
                        },
                        rate: 3,
                        price: 1200,
                    },
                    {
                        name: 'Рюкзак',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Рюкзак',
                        },
                        rate: 5,
                        price: 800,
                    },
                    {
                        name: 'Сумка',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Сумка',
                        },
                        rate: 4,
                        price: 50,
                    },
                ],
            },
            {
                categories: 'Бижутерия',
                positions: [
                    {
                        name: 'Кольцо',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Кольцо',
                        },
                        rate: 5,
                        price: 300,
                    },
                    {
                        name: 'Ожерелье',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Ожерелье',
                        },
                        rate: 4,
                        price: 500,
                    },
                    {
                        name: 'Браслет',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Браслет',
                        },
                        rate: 3,
                        price: 400,
                    },
                    {
                        name: 'Часы',
                        img: {
                            src: './contentDB/imgs/noImage.jpg',
                            alt: 'Часы',
                        },
                        rate: 5,
                        price: 200,
                    },
                ],
            },
        ],
    },
    {
        categories: 'Детям',
        positions: [
            {
                name: 'Игрушка',
                img: { src: './contentDB/imgs/noImage.jpg', alt: 'Игрушка' },
                rate: 3,
                price: 15,
            },
            {
                name: 'Детский костюм',
                img: {
                    src: './contentDB/imgs/noImage.jpg',
                    alt: 'Детский костюм',
                },
                rate: 4,
                price: 35,
                prevPrice: 45,
            },
        ],
    },
    {
        categories: 'Красота и здоровье',
        positions: [
            {
                name: 'Крем для лица',
                img: {
                    src: './contentDB/imgs/noImage.jpg',
                    alt: 'Крем для лица',
                },
                rate: 5,
                price: 30,
            },
            {
                name: 'Витамины',
                img: { src: './contentDB/imgs/noImage.jpg', alt: 'Витамины' },
                rate: 4,
                price: 25,
            },
        ],
    },
    {
        categories: 'Спорт',
        positions: [
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
            {
                name: 'Гантели',
                img: { src: './contentDB/imgs/noImage.jpg', alt: 'Гантели' },
                rate: 5,
                price: 40,
            },
            {
                name: 'Фитнес-мотиватор',
                img: {
                    src: './contentDB/imgs/noImage.jpg',
                    alt: 'Фитнес-мотиватор',
                },
                rate: 4,
                price: 80,
                prevPrice: 100,
            },
        ],
    },
    {
        categories: 'Электроника',
        positions: [
            {
                name: 'Смартфон',
                img: { src: './contentDB/imgs/noImage.jpg', alt: 'Смартфон' },
                rate: 5,
                price: 500,
                prevPrice: 600,
            },
            {
                name: 'Ноутбук',
                img: { src: './contentDB/imgs/noImage.jpg', alt: 'Ноутбук' },
                rate: 4,
                price: 800,
            },
        ],
    },
    {
        categories: 'Автотовары',
        positions: [
            {
                name: 'Автомобильный пылесос',
                img: {
                    src: './contentDB/imgs/noImage.jpg',
                    alt: 'Автомобильный пылесос',
                },
                rate: 4,
                price: 25,
            },
            {
                name: 'Автокресло',
                img: { src: './contentDB/imgs/noImage.jpg', alt: 'Автокресло' },
                rate: 5,
                price: 120,
            },
        ],
    },
    {
        categories: 'Канцелярия',
        positions: [
            {
                name: 'Ручка',
                img: { src: './contentDB/imgs/noImage.jpg', alt: 'Ручка' },
                rate: 4,
                price: 5,
            },
            {
                name: 'Бумага',
                img: { src: './contentDB/imgs/noImage.jpg', alt: 'Бумага' },
                rate: 3,
                price: 10,
            },
        ],
    },
]

const CatalogPositionsGrid = (filters: string[]) => {
    return <div></div>
}
