import '../fonts/stylesheet.css'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { RootState } from '../store'

import AppHeader from '../components/AppHeader/AppHeader'
import Footer from '../components/Footer/Footer'
import PreviousPage from '../pages/PreviousPage'
import CatalogPage from '../pages/CatalogPage'
import ShopCartPage from '../pages/ShopCartPage'
import Modal from '../components/modals/Modal'

import displayWidthHandler from '../utils/displayWidthHandler'

const App = () => {
    const dispatch = useDispatch()
    const displayWidth = useSelector(
        (state: RootState) => state.user.displayWidth
    )

    useEffect(() => {
        const resizeListener = () => {
            displayWidthHandler(dispatch, window.innerWidth, displayWidth)
        }
        window.addEventListener('resize', resizeListener)
        return () => {
            window.removeEventListener('resize', resizeListener)
        }
    }, [displayWidth])

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
