import NavigationSteps from '../components/NavigationStep/NavigationStep'
import CartTable from '../components/CartTable/CartTable'
import { ItemDataInterface } from '../components/ItemCard/ItemCard'

const ShopCartPage = () => {
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
