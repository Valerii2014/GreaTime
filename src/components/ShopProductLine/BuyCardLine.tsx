import '../ItemLine/itemLine.scss'

import { Position } from '../../store/appSlice/positionsSlice'
import { ChangeEvent, ReactEventHandler, useState } from 'react'
import { onTransformPrice } from '../../utils/stringTransformer'
import {
    removeProduct,
    addProductToShopCart,
    delProductFromShopCart,
    setProductQuantityInCart,
} from '../../store/appSlice/userSlice'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../store'

interface BuyCardProps {
    productData: Position
}

const BuyCardLine = (props: BuyCardProps) => {
    const dispatch = useDispatch()
    const products = useAppSelector((store) => store.user.shopCart)

    const { productData } = props
    const { imgs, name, price, _id } = productData
    const img = imgs[0]

    const getProductQuantity = (id: string) => {
        let quantity
        for (const product of products) {
            if (product[0] === id) {
                quantity = product[1]
                break
            }
        }
        return quantity ? quantity : 0
    }

    const quantity = getProductQuantity(_id)
    const maxClass =
        quantity === 20 ? 'buy-card_functional_price_summary_max' : ''

    const addProduct = () => {
        if (quantity < 20) dispatch(addProductToShopCart(_id))
    }
    const deleteProduct = () => {
        if (quantity > 1) dispatch(delProductFromShopCart(_id))
    }

    const setQuantityProduct = (_id: string, quantity: number) => {
        const payload = { _id, quantity }
        dispatch(setProductQuantityInCart(payload))
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = +event.target.value
        if (newQuantity <= 20) setQuantityProduct(_id, newQuantity)
        else setQuantityProduct(_id, 20)
    }

    const handleInputBlur = () => {
        if (quantity === 0 || isNaN(quantity)) {
            setQuantityProduct(_id, 1)
        }
    }

    const handleImageError: ReactEventHandler<HTMLImageElement> = (event) => {
        event.currentTarget.src = './icons/noImage.jpg'
    }

    return (
        <div className="buy-card" key={_id}>
            <div className="buy-card_info">
                <div className="buy-card_info_img">
                    <img src={img} alt={name} onError={handleImageError} />
                </div>
                <div className="buy-card_info_descr">
                    <div className="buy-card_info_descr_code">
                        <span>Артикул: </span>
                        {_id}
                    </div>
                    <div className="buy-card_info_descr_name">{name}</div>
                </div>
            </div>
            <div className="buy-card_functional">
                <div className="buy-card_functional_price">
                    {onTransformPrice(price)} ₴
                </div>
                <div className="buy-card_functional_more-less">
                    <span onClick={deleteProduct}>-</span>
                    <span>
                        <input
                            type="number"
                            // Use value prop to make the input controlled by the state
                            value={quantity}
                            onBlur={handleInputBlur}
                            onChange={handleInputChange}
                        />
                    </span>
                    <span onClick={addProduct}>+</span>
                </div>
                <div
                    className={`buy-card_functional_price_summary ${maxClass}`}
                >
                    {onTransformPrice(quantity * price)}₴
                </div>
            </div>
            <div
                className="buy-card_delete"
                onClick={() => dispatch(removeProduct(_id))}
            >
                <div />
                <div />
            </div>
        </div>
    )
}

export default BuyCardLine
