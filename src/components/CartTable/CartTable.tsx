import './cartTable.scss'

import { ItemDataInterface } from '../ItemCard/ItemCard'
import BuyCardLine from '../ItemCardLine/BuyCardLine'

interface BuyCardLineProps {
    positionData: ItemDataInterface // Make sure the prop is correctly defined
}

const itemData: ItemDataInterface[] = [
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
        rate: 5,
        price: 330,
        prevPrice: 550,
    },
]

const CartTable = () => {
    const onBuildCartPositions = () => {
        return itemData.map((position, i) => {
            return (
                <div key={i} className="shop-cart_table_item">
                    {BuyCardLine(position)}
                    <div className="shop-cart_table_item_delete">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className="shop-cart">
            <div className="shop-cart_header">
                <div className="section-header">Ваша корзина</div>
                <div className="shop-cart_header_buttons">
                    <button className="button_shop-cart button_shop-cart_white button_shop-cart_white_header">
                        Продолжить покупки
                    </button>
                    <button className="button_shop-cart">Оформить заказ</button>
                </div>
            </div>
            <div className="shop-cart_table">
                <div className="shop-cart_table_headers">
                    <div className="shop-cart_table_headers_left">
                        <span>Фото</span>
                        <span>Наименование товара</span>
                    </div>
                    <div className="shop-cart_table_headers_right">
                        <span>Цена за ед.</span>
                        <span>кол-во:</span>
                        <span>Итого:</span>
                    </div>
                </div>
                {onBuildCartPositions()}
            </div>
            <div className="shop-cart_sumary">
                <div className="shop-cart_sumary_info">
                    <div className="shop-cart_sumary_info_promo">
                        Промокод
                        <input type="text" placeholder="Промокод" />
                    </div>
                    <div className="shop-cart_sumary_info_price">
                        <div className="shop-cart_sumary_info_price_summ">
                            <span>Сумма</span>
                            <span>999 999 ₴</span>
                        </div>
                        <div className="shop-cart_sumary_info_price_summ">
                            <span>НДС 20% (20% включено)</span>
                            <span>999 999 ₴</span>
                        </div>
                    </div>
                </div>
                <div className="shop-cart_sumary_total">
                    <span>Итоговая стоимость</span>
                    <span>999 999 </span>₴
                </div>
            </div>
            <div className="shop-cart_btns">
                <div className="shop-cart_header_buttons">
                    <button className="button_shop-cart">
                        Продолжить покупки
                    </button>
                    <button className="button_shop-cart button_shop-cart_white button_shop-cart_white_bottom">
                        Очистить корзину
                    </button>
                </div>
                <button className="button_shop-cart">Оформить заказ</button>
            </div>
        </div>
    )
}

export default CartTable
