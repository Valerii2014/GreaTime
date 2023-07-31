import NavigationSteps from '../components/NavigationStep/NavigationStep'
import Catalog from '../components/Catalog/Catalog'

const CatalogPage = () => {
    return (
        <>
            <NavigationSteps steps={['главная', 'КАТАЛОГ']} />
            <Catalog />
        </>
    )
}

export default CatalogPage
