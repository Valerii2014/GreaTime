import PromoSlider from '../components/PromoSlider/PromoSlider'
import { CategoryCards } from '../components/CategoryCards/CategoryCards'
import PopularProduct from '../components/PopularProducts/PopularProducts'
import Benefits from '../components/Benefits/Benefits'
import Connection from '../components/Connection/Connection'
import Partners from '../components/Partners/Partners'
import { useEffect } from 'react'
const PreviousPage = () => {
    useEffect(() => window.scrollTo(0, 0), [])
    return (
        <>
            <PromoSlider />
            <div className="container">
                <CategoryCards />
                <PopularProduct />
                <Benefits />
                <Connection />
                <Partners />
            </div>
        </>
    )
}

export default PreviousPage
