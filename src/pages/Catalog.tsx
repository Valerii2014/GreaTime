import NavigationSteps from '../components/NavigationStep/NavigationStep'
import CatalogGrid from '../components/CatalogGrid/CatalogGrid'

const Catalog = () => {
    return (
        <>
            <NavigationSteps steps={['главная', 'КАТАЛОГ']} />
            <CatalogGrid />
        </>
    )
}

export default Catalog
