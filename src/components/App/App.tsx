import './App.scss'
import AppHeader from '../AppHeader/AppHeader'
import PromoSlider from '../PromoSlider/PromoSlider'
import CategoryCards from '../CategoryCards/CategoryCards'
import PopularPosition from '../PopularPositions/PopularPositions'
import Benefits from '../Benefits/Benefits'
import Connection from '../Connection/Connection'
import Partners from '../Partners/Partners'
import Footer from '../Footer/Footer'

const App = () => {
    return (
        <>
            <AppHeader />
            <PromoSlider />
            <CategoryCards />
            <PopularPosition />
            <Benefits />
            <Connection />
            <Partners />
            <Footer />
        </>
    )
}

export default App
