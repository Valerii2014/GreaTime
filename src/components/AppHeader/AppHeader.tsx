import './appHeader.scss'

import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useGetProductWithNameQuery } from '../../services/productsApi'
import { setModalType } from '../../store/appSlice/sliderAndModalSlice'

import ItemLine from '../ItemLine/ItemLine'

function CustomLink({
    to,
    children,
    className,
}: {
    to: string
    children: React.ReactNode
    className: string
}) {
    const location = useLocation()

    const isActive = location.pathname === to

    const classNameActive = isActive ? 'active' : ''

    return (
        <Link to={to} className={`${classNameActive} ${className}`}>
            {children}
        </Link>
    )
}

const AppHeader = () => {
    const dispatch = useDispatch()
    const setModalTypeLogIn = () => dispatch(setModalType('logIn'))

    const [inputValue, setInputValue] = useState('')
    const [productName, setProductName] = useState('')

    const { data, isFetching, isError } =
        useGetProductWithNameQuery(productName)

    useEffect(() => {
        if (inputValue.length > productName.length + 2) {
            setProductName(inputValue)
        } else if (inputValue.length < 3) {
            setProductName('')
        }
    }, [inputValue])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const handleSearchClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        setProductName(inputValue)
    }

    const findedProducts =
        data && productName !== '' ? (
            data.length > 0 ? (
                <div className="search_products">
                    {data.map((productData) => (
                        <ItemLine productData={productData} />
                    ))}
                </div>
            ) : (
                <div className="search_products">
                    По вашему запросу товаров не найдно
                </div>
            )
        ) : null

    return (
        <div className="app-header">
            <nav className="nav">
                <div className="container">
                    <div className="nav-wrapper">
                        <address className="nav_address">Київ</address>
                        <ul className="nav_links">
                            <li className="nav_link">
                                <a href="#">Розничным покупателям</a>
                            </li>
                            <li className="nav_link">
                                <a href="#">Оптовым покупателям</a>
                            </li>
                            <li className="nav_link">
                                <a href="#">Регстрация юр.лиц</a>
                            </li>
                            <li className="nav_link">
                                <a href="#">Регстрация физ.лиц</a>
                            </li>
                        </ul>
                        <div className="nav_phone">+38 067 119 7297</div>
                    </div>
                </div>
            </nav>
            <div className="company">
                <div className="container">
                    <div className="company-wrapper">
                        <div className="company_social">
                            <div className="company_social_container">
                                <a href="/">
                                    <img
                                        src="./icons/system/whatsapp.svg"
                                        alt="whatsapp"
                                    />
                                </a>
                                <a href="/">
                                    <img
                                        src="./icons/system/telegram.svg"
                                        alt="telegram"
                                    />
                                </a>
                            </div>
                        </div>
                        <Link to={'/'} className="company_logo">
                            <h1>GreaTime</h1>
                            <img src="./icons/logoGrea.svg" alt="GreaTime" />
                        </Link>
                        <div className="company_info">
                            <div className="company_info_links">О компании</div>
                            <div className="company_info_links">Контакты</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="func-panel">
                <div className="container">
                    <div className="func-panel-wrapper">
                        <CustomLink
                            to="/catalog"
                            className="button_catalog_wrapper"
                        >
                            <button className="button_catalog">
                                <div className="button button_catalog_span-container">
                                    <span />
                                    <span />
                                    <span />
                                </div>
                                Каталог
                            </button>
                        </CustomLink>
                        <div
                            className="search"
                            onMouseLeave={() => setProductName('')}
                            onMouseEnter={() => {
                                if (inputValue.length > 2)
                                    setProductName(inputValue)
                            }}
                        >
                            <form className="search_form" action="submit">
                                <input
                                    type="text"
                                    placeholder="Введите название товара:"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                                <button
                                    className="button_search-form"
                                    onClick={handleSearchClick}
                                >
                                    Найти
                                </button>
                            </form>
                            {findedProducts}
                        </div>

                        <div className="func-panel_icons">
                            <div
                                className="func-panel_icon func-panel_icon_active"
                                onClick={setModalTypeLogIn}
                            >
                                <img
                                    src="./icons/system/profile.svg"
                                    alt="custom icon"
                                />
                                <div>Войти</div>
                            </div>
                            <Link
                                to="/shopcart"
                                className="func-panel_icon func-panel_icon_active"
                            >
                                <img
                                    src="./icons/system/favorite.svg"
                                    alt="customicon"
                                />
                                <div>Избранное</div>
                            </Link>
                            <Link
                                to="/shopcart"
                                className="func-panel_icon func-panel_icon_active"
                            >
                                <img
                                    src="./icons/system/buy.svg"
                                    alt="custom icon"
                                />
                                <div>Корзина</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppHeader
