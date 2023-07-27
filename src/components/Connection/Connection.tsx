import './connection.scss'

const Connection = () => {
    return (
        <section className="connection">
            <div className="connection_wrapper">
                <h3 className="connection_header">Оптовый прайс на почту</h3>
                <div className="connection_description">
                    В случае заинтересованности готовы направить вам прайс-лист
                    с оптовыми ценами
                </div>
                <form className="connection_search_form" action="submit">
                    <input type="mail" placeholder="Введите Ваш E-mail" />
                    <button className="connection_search_form_button">
                        Продолжить
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Connection
