import NavigationSteps from '../components/NavigationStep/NavigationStep'
import CartTable from '../components/CartTable/CartTable'
import { useEffect } from 'react'
const ShopCartPage = () => {
    useEffect(() => window.scrollTo(0, 0), [])
    return (
        <>
            <div className="container">
                <NavigationSteps steps={['главная', 'корзина']} />
                <CartTable />
            </div>
        </>
    )
}

export default ShopCartPage
