import PromoSlider from '../components/PromoSlider/PromoSlider'
import { CategoryCards } from '../components/CategoryCards/CategoryCards'
import PopularPosition from '../components/PopularPositions/PopularPositions'
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
                <PopularPosition />
                <Benefits />
                <Connection />
                <Partners />
            </div>
        </>
    )
}

export default PreviousPage
