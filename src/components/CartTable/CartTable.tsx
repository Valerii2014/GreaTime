import './cartTable.scss'

import { Position, PositionsData } from '../../store/appSlice/positionsSlice'
import BuyCardLine from '../ItemCartLine/BuyCardLine'
import { useAppSelector } from '../../store'
import { useGetProductWithIdQuery } from '../../services/positionsApi'
import {
    addProductToShopCart,
    delProductFromShopCart,
    setProductQuantityInCart,
} from '../../store/appSlice/userSlice'
import { useDispatch } from 'react-redux'
import { onTransformPrice } from '../../utils/stringTransformer'

const CartTable = () => {
    const dispatch = useDispatch()
    const products = useAppSelector((store) => store.user.shopCart)
    const { data, isFetching, isError } = useGetProductWithIdQuery(
        products.map((productData) => productData[0])
    )
    const productsObject = Object.fromEntries(products)

    const addProduct = (productId: string) => {
        dispatch(addProductToShopCart(productId))
    }
    const delProduct = (productId: string) => {
        dispatch(delProductFromShopCart(productId))
    }
    const setQuantityProduct = (productId: string, newQuantity: number) => {
        dispatch(setProductQuantityInCart({ productId, newQuantity }))
    }

    const totalAmount = data
        ? data.reduce((acc, product) => {
              const price = product.price
              const productQuantity = productsObject[product._id]
              return acc + price * productQuantity
          }, 0)
        : 0
    const ndsAmount = totalAmount > 0 ? Math.floor((totalAmount / 10) * 2) : 0
    const totalAmountWithNds = totalAmount + ndsAmount

    const buildCartProducts = (data: PositionsData) => {
        return data.map((productData) =>
            BuyCardLine(
                productData,
                productsObject[productData._id],
                addProduct,
                delProduct,
                setQuantityProduct
            )
        )
    }

    const cartProducts = data ? buildCartProducts(data) : null
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
                {cartProducts}
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
                            <span>{onTransformPrice(totalAmount)} ₴</span>
                        </div>
                        <div className="shop-cart_sumary_info_price_summ">
                            <span>НДС 20% (20% включено)</span>
                            <span>{onTransformPrice(ndsAmount)} ₴</span>
                        </div>
                    </div>
                </div>
                <div className="shop-cart_sumary_total">
                    <span>Итоговая стоимость</span>
                    <span>{onTransformPrice(totalAmountWithNds)} </span>₴
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
