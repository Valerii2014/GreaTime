import NavigationSteps from '../components/NavigationStep/NavigationStep'
import CatalogGrid from '../components/CatalogGrid/CatalogGrid'

const CatalogPage = () => {
    return (
        <>
            <NavigationSteps steps={['главная', 'КАТАЛОГ']} />
            <CatalogGrid />
        </>
    )
}

export default CatalogPage
