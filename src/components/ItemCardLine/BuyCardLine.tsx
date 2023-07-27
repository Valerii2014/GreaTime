import './buyCardLine.scss'

import { ItemDataInterface } from '../ItemCard/ItemCard'
import { useState, ChangeEvent } from 'react'

const BuyCardLine = (positionData: ItemDataInterface) => {
    const [amount, setAmount] = useState(1)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value)) // Use Number() to convert the input value to a number
    }

    const handleInputBlur = () => {
        // If the input value is 0 or empty, set the amount to 1
        if (amount === 0 || isNaN(amount)) {
            setAmount(1)
        }
    }

    const addItem = () => setAmount((ammount) => ammount + 1)
    const delItem = () => {
        if (amount - 1 <= 0) {
            return
        }
        setAmount((ammount) => ammount - 1)
    }
    return (
        <div className="buy-card">
            <div className="buy-card_info">
                <img src={positionData.img.src} alt={positionData.img.alt} />
                <div className="buy-card_info_descr">
                    <div className="buy-card_info_descr_code">
                        <span>Артикул: </span>
                        {positionData.img.alt}
                    </div>
                    <div className="buy-card_info_descr_name">
                        {positionData.name}
                    </div>
                </div>
            </div>
            <div className="buy-card_functional">
                <div className="buy-card_functional_price">
                    {positionData.price} ₴
                </div>
                <div className="buy-card_functional_more-less">
                    <span onClick={delItem}>-</span>
                    <span>
                        <input
                            type="number"
                            value={amount} // Use value prop to make the input controlled by the state
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                        />
                    </span>
                    <span onClick={addItem}>+</span>
                </div>
                <div className="buy-card_functional_price_summary">
                    {amount * positionData.price}₴
                </div>
            </div>
        </div>
    )
}

export default BuyCardLine
