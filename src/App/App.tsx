import '../fonts/stylesheet.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AppHeader from '../components/AppHeader/AppHeader'
import Footer from '../components/Footer/Footer'
import PreviousPage from '../pages/PreviousPage'
import CatalogPage from '../pages/CatalogPage'
import ShopCartPage from '../pages/ShopCartPage'
import Modal from '../components/modals/Modal'

const App = () => {
    return (
        <Router>
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/" element={<PreviousPage />} />
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/shopcart" element={<ShopCartPage />} />
                </Routes>
                {Modal()}
            </main>
            <Footer />
        </Router>
    )
}

export default App
