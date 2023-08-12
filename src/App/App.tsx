import '../fonts/stylesheet.css'
import './App.scss'
import AppHeader from '../components/AppHeader/AppHeader'
import Footer from '../components/Footer/Footer'
import PreviousPage from '../pages/PreviousPage'
import CatalogPage from '../pages/CatalogPage'
import ShopCartPage from '../pages/ShopCartPage'

const App = () => {
    return (
        <>
            <AppHeader />
            {/* <PreviousPage /> */}
            <CatalogPage />
            {/* <ShopCartPage /> */}
            <Footer />
        </>
    )
}

export default App
