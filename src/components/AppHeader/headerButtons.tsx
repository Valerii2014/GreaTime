import { Link } from 'react-router-dom'

const CatalogButton = () => {
    return (
        <Link to="/catalog" className="button_catalog_wrapper">
            <button className="button_catalog">
                <div className="button button_catalog_span-container">
                    <span />
                    <span />
                    <span />
                </div>
                Каталог
            </button>
        </Link>
    )
}

const HomeButton = () => {
    return (
        <Link to="/" className="button_catalog_wrapper">
            <button className="button_catalog">
                <div className="button button_catalog_span-container-home">
                    <span />
                    <span />
                    <span />
                    <span />
                </div>
                Главная
            </button>
        </Link>
    )
}

export { CatalogButton, HomeButton }
