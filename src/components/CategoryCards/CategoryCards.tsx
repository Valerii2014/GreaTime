import './categoryCards.scss'

interface CategoryItem {
    name: string
    url: string
    alt: string
}
const categoryFromDB: CategoryItem[] = [
    {
        name: 'Обувь',
        url: './contentDB/imgs/category/category1.jpg',
        alt: 'ffffdfdfdf',
    },
    {
        name: 'Одежда',
        url: './contentDB/imgs/category/category2.jpg',
        alt: 'ffffdfdfdf',
    },
    {
        name: 'Аксессуары',
        url: './contentDB/imgs/category/category3.jpg',
        alt: 'ffffdfdfdf',
    },
    {
        name: 'Детям',
        url: './contentDB/imgs/category/category4.jpg',
        alt: 'ffffdfdfdf',
    },
    {
        name: 'Красота и здоровье',
        url: './contentDB/imgs/category/category5.jpg',
        alt: 'ffffdfdfdf',
    },
    {
        name: 'Спорт',
        url: './contentDB/imgs/category/category6.jpg',
        alt: 'ffffdfdfdf',
    },
    {
        name: 'Электроника',
        url: './contentDB/imgs/category/category7.jpg',
        alt: 'ffffdfdfdf',
    },
    {
        name: 'Спортивное питание',
        url: './contentDB/imgs/category/category8.jpg',
        alt: 'ffffdfdfdf',
    },
    {
        name: 'Автотовары',
        url: './contentDB/imgs/category/category9.jpg',
        alt: 'ffffdfdfdf',
    },
    {
        name: 'Концелярия',
        url: './contentDB/imgs/category/category10.jpg',
        alt: 'ffffdfdfdf',
    },
]

const CatalogCards = () => {
    const onBuildCategoryItems = (data: CategoryItem[]) => {
        return data.map((category, key) => {
            const { name, url, alt } = category
            return (
                <div className="catalog_card" key={key}>
                    <img src={url} alt={alt} className="category_card_img" />
                    <div className="catalog_card_name">{name}</div>
                    <div className="catalog_card_name_background"></div>
                </div>
            )
        })
    }
    return (
        <section className="catalog_cards">
            <h2 className="section-header">Наш асортимент</h2>
            <div className="catalog_cards_wrapper">
                {onBuildCategoryItems(categoryFromDB)}
            </div>
        </section>
    )
}

export default CatalogCards
