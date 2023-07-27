import '../fonts/stylesheet.css'
import './App.scss'
import AppHeader from '../components/AppHeader/AppHeader'
import Footer from '../components/Footer/Footer'
import PreviousPage from '../pages/Previous'
import Catalog from '../pages/Catalog'
import ShopCart from '../pages/ShopCart'

const App = () => {
    return (
        <>
            <AppHeader />
            {/* <PreviousPage /> */}
            {/* <Catalog /> */}
            <ShopCart />
            <Footer />
        </>
    )
}

export default App
