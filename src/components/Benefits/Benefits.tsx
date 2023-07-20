import './benefits.scss'

const Benefits = () => {
    return (
        <section className="benefits">
            <div className="container">
                <div className="benefits_grid">
                    <div className="benefits_item">
                        <div className="benefits_item_img">
                            <img
                                src="./icons/ourFiches/original.svg"
                                alt="original"
                            />
                        </div>
                        <h4 className="benefits_item_header">100% оригиналы</h4>
                        <div className="benefits_item_description">
                            Мы работаем со всеми представительствами брендов
                            напрямую, а по некоторым из них являемся
                            эксклюзивным оптовым каналом дистрибуции, что дает
                            нам возможность предлагать лучшие цены и условия.
                        </div>
                    </div>
                    <div className="benefits_item">
                        <div className="benefits_item_img">
                            <img src="./icons/ourFiches/100.svg" alt="100%" />
                        </div>
                        <h4 className="benefits_item_header">100% качество</h4>
                        <div className="benefits_item_description">
                            У нас оригинальный и сертифицированный товар, что
                            подтверждено официальными документами
                        </div>
                    </div>
                    <div className="benefits_item">
                        <div className="benefits_item_img">
                            <img
                                src="./icons/ourFiches/shopBug.svg"
                                alt="shopBug"
                            />
                        </div>
                        <h4 className="benefits_item_header">
                            Большой ассортимент
                        </h4>
                        <div className="benefits_item_description">
                            Довольно широкий ассортимент товарова, вы
                            обязательно сможете подобрать именно то, что нужно.
                            У нас более 3000 категорий
                        </div>
                    </div>
                    <div className="benefits_item">
                        <div className="benefits_item_img">
                            <img src="./icons/ourFiches/car.svg" alt="car" />
                        </div>
                        <h4 className="benefits_item_header">Доставка</h4>
                        <div className="benefits_item_description">
                            Моменталтная отгрузка товаров из Екатеринбурга в
                            любую точку России любой крупной транспортной
                            компанией. Наш склад находится в паре км от любой
                            крупной ТК. Отгрузка товара в течение 1 дня.{' '}
                        </div>
                    </div>
                    <div className="benefits_item">
                        <div className="benefits_item_img">
                            <img
                                src="./icons/ourFiches/package.svg"
                                alt="package"
                            />
                        </div>
                        <h4 className="benefits_item_header">
                            Нам можно доверять
                        </h4>
                        <div className="benefits_item_description">
                            Наша компания более 10 лет занимается продажей
                            спортивных товаров. За это время мы накопили
                            огромный опыт в оптовом направлении. У нас продуманы
                            даже самые мелкие детали.
                        </div>
                    </div>
                    <div className="benefits_item">
                        <div className="benefits_item_img">
                            <img
                                src="./icons/ourFiches/mobile.svg"
                                alt="mobile"
                            />
                        </div>
                        <h4 className="benefits_item_header">
                            У нас нет очередей
                        </h4>
                        <div className="benefits_item_description">
                            После оформления заказа, вы не попадете в очередь на
                            выстпвление счета, в очередь на сборку заказа или в
                            очередь на отгрузку. Мы осуществялем этот сервис
                            моментально
                        </div>
                    </div>
                    <div className="benefits_item">
                        <div className="benefits_item_img">
                            <img
                                src="./icons/ourFiches/users.svg"
                                alt="support"
                            />
                        </div>
                        <h4 className="benefits_item_header">
                            Оперативная поддержка
                        </h4>
                        <div className="benefits_item_description">
                            Если у вас возникла проблема, мы обязательно ее
                            решим на раз-два-три. Мы работаем на все 100%, нам
                            нечего бояться.
                        </div>
                    </div>
                    <div className="benefits_item">
                        <div className="benefits_item_img">
                            <img
                                src="./icons/ourFiches/order.svg"
                                alt="order"
                            />
                        </div>
                        <h4 className="benefits_item_header">Заказы</h4>
                        <div className="benefits_item_description">
                            Минимальная сумма заказа – всего 20 000 руб. Мы
                            открыты для сотрудничества с малыми, средними и
                            крупным бизнесом.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Benefits
