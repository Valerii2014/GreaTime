import NavigationSteps from '../components/NavigationStep/NavigationStep'
import Catalog from '../components/Catalog/Catalog'
import { useEffect } from 'react'

const CatalogPage = () => {
    useEffect(() => window.scrollTo(0, 0), [])
    return (
        <>
            <NavigationSteps steps={['главная', 'КАТАЛОГ']} />
            <Catalog />
        </>
    )
}

export default CatalogPage
