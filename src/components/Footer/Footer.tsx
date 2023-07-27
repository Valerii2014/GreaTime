import './footer.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer_flex">
                    <div className="footer_flex_contacts">
                        <img
                            src="./icons/system/logo.svg"
                            alt="GreaTIme-logo"
                        />
                        <span className="footer_flex_contacts_company-name">
                            © 2023 “Gream Time”
                        </span>
                        <span className="footer_flex_contacts_confidential">
                            <a href="#">Политика конфиденциальности</a>
                        </span>
                        <div className="footer_flex_contacts_icons">
                            <a href="#">
                                {' '}
                                <img
                                    src="./icons/system/telegram-white.svg"
                                    alt="telegram"
                                />
                            </a>
                            <a href="#">
                                {' '}
                                <img
                                    src="./icons/system/facebook-white.svg"
                                    alt="facabook-white"
                                />
                            </a>
                            <a href="#">
                                {' '}
                                <img
                                    src="./icons/system/whatsap-white.svg"
                                    alt="whatsap"
                                />
                            </a>
                            <a href="#">
                                {' '}
                                <img
                                    src="./icons/system/instagram-white.svg"
                                    alt="instagram"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="footer_flex_info">
                        <div className="footer_flex_info_header">
                            Информация
                        </div>
                        <ul className="footer_flex_info_list">
                            <li className="footer_flex_info_list_item">
                                <a href="#">О компании</a>
                            </li>
                            <li className="footer_flex_info_list_item">
                                <a href="#">Маркетинговые материалы</a>
                            </li>
                            <li className="footer_flex_info_list_item">
                                <a href="#">Контакты</a>
                            </li>
                            <li className="footer_flex_info_list_item">
                                <a href="#">Карта сайта</a>
                            </li>
                        </ul>
                        <div className="footer_flex_info_header">Контакты</div>
                        <ul className="footer_flex_info_list">
                            <li className="footer_flex_info_list_item">
                                <a href="tel:380671197297">
                                    +38 (067) 119-72-97
                                </a>
                            </li>
                            <li className="footer_flex_info_list_item">
                                <a href="tel:380671197297">
                                    +38 (067) 119-72-98
                                </a>
                            </li>
                            <li className="footer_flex_info_list_item">
                                <address>Киев, ул Оболонская 67</address>
                            </li>
                        </ul>
                    </div>
                    <div className="footer_flex_info">
                        <div className="footer_flex_info_header">
                            Розничным <br />
                            покупателям
                        </div>
                        <ul className="footer_flex_info_list">
                            <li className="footer_flex_info_list_item">
                                <a href="#">Как сделать заказ</a>
                            </li>
                            <li className="footer_flex_info_list_item">
                                <a href="#">Доставка и оплата</a>
                            </li>
                            <li className="footer_flex_info_list_item">
                                <a href="#">Возврат</a>
                            </li>
                            <li className="footer_flex_info_list_item">
                                <a href="#">Вопрос-ответ</a>
                            </li>
                        </ul>
                        <div className="footer_flex_info_header">
                            Производителям
                        </div>
                    </div>
                    <div className="footer_flex_info">
                        <div className="footer_flex_info_header">
                            Оптовым
                            <br />
                            покупателям
                        </div>
                        <ul className="footer_flex_info_list">
                            <li className="footer_flex_info_list_item">
                                <a href="#">Как сделать заказ</a>
                            </li>
                            <li className="footer_flex_info_list_item">
                                <a href="#">Доставка и оплата</a>
                            </li>
                            <li className="footer_flex_info_list_item">
                                <a href="#">Возврат</a>
                            </li>
                            <li className="footer_flex_info_list_item">
                                <a href="#">Вопрос-ответ</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer_flex_info">
                        <span className="footer_flex_info_description">
                            Вы можете оформить заказ по телефону или получить
                            ответы на любые интересующие вас вопросы.
                        </span>
                        <span className="footer_flex_info_description">
                            Есть вопрос? Напишите нам письмо <br />
                            или воспользуйтесь формой{' '}
                            <a href="#">oбратной связи</a>
                        </span>
                    </div>
                </div>
                <div className="footer_line"></div>
                <div className="footer_bottom">
                    <div className="footer_bottom_company">
                        Интернет-магазин «GreaTime» - спортивные товары по всей
                        Украине
                    </div>
                    <div className="footer_bottom_inn">
                        <span> Инн: </span> 667027205771{' '}
                        <span> ОГРН:{'  '}</span>310667022200016
                    </div>

                    <a href="#">
                        <img
                            src="./icons/system/mastercard.svg"
                            alt="mastercard available"
                        />
                    </a>
                    <a href="#">
                        <img
                            src="./icons/system/visa.svg"
                            alt="visa availablle"
                        />
                    </a>
                    <a href="#">
                        <img
                            src="./icons/system/amer-express.svg"
                            alt="american express"
                        />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
