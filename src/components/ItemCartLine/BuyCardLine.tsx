import '../ItemLine/itemLine.scss'

import { Position, PositionsData } from '../../store/appSlice/positionsSlice'
import { useState, useEffect, ChangeEvent, ReactEventHandler } from 'react'
import { onTransformPrice } from '../../utils/stringTransformer'

const BuyCardLine = (
    positionData: Position,
    initialQuantity: number,
    addProduct: (productId: string) => void,
    deleteProduct: (productId: string) => void,
    setQuantityProduct: (productId: string, newQuantity: number) => void
) => {
    const { imgs, name, price, _id } = positionData
    const img = imgs[0]

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = +event.target.value
        if (newQuantity <= 20) setQuantityProduct(_id, +event.target.value)
        else setQuantityProduct(_id, 20)
    }

    const handleInputBlur = () => {
        // If the input value is 0 or empty, set the amount to 1
        if (initialQuantity === 0 || isNaN(initialQuantity)) {
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
                        {name}
                    </div>
                    <div className="buy-card_info_descr_name">{name}</div>
                </div>
            </div>
            <div className="buy-card_functional">
                <div className="buy-card_functional_price">
                    {onTransformPrice(price)} ₴
                </div>
                <div className="buy-card_functional_more-less">
                    <span onClick={() => deleteProduct(_id)}>-</span>
                    <span>
                        <input
                            type="number"
                            value={initialQuantity} // Use value prop to make the input controlled by the state
                            onBlur={handleInputBlur}
                            onChange={handleInputChange}
                        />
                    </span>
                    <span onClick={() => addProduct(_id)}>+</span>
                </div>
                <div className="buy-card_functional_price_summary">
                    {onTransformPrice(initialQuantity * positionData.price)}₴
                </div>
            </div>
        </div>
    )
}

export default BuyCardLine
