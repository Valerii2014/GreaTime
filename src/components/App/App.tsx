import './App.scss'
import AppHeader from '../AppHeader/AppHeader'
import PromoSlider from '../PromoSlider/PromoSlider'
import CategoryCards from '../CategoryCards/CategoryCards'
import PopularPosition from '../PopularPositions/PopularPositions'

const App = () => {
    return (
        <>
            <AppHeader />
            <PromoSlider />
            <CategoryCards />
            <PopularPosition />
        </>
    )
}

export default App
