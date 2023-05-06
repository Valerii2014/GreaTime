import "./appHeader.scss";

const AppHeader = () => {
  return (
    <div className="app-header">
      <nav className="nav">
        <div className="container">
          <div className="nav-wrapper">
            <address className="nav_address">Київ</address>
            <ul className="nav_links">
              <li className="nav_link">
                <a href="мві">Розничным покупателям</a>
              </li>
              <li className="nav_link">
                <a href="мві">Оптовым покупателям</a>
              </li>
              <li className="nav_link">
                <a href="мві">Регстрация юр.лиц</a>
              </li>
              <li className="nav_link">
                <a href="мві">Регстрация физ.лиц</a>
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
                <a href="dsfds">
                  <img src="./icons/whatsapp.svg" alt="whatsapp" />
                </a>
                <a href="dsfds">
                  <img src="./icons/telegram.svg" alt="telegram" />
                </a>
              </div>
            </div>
            <h1 className="company_logo">GreaTime</h1>
            <div className="company_info">
              <div className="company_info_links">О компании</div>
              <div className="company_info_links">Контакті</div>
            </div>
          </div>
        </div>
      </div>
      <div className="func-panel">
        <div className="container">
          <div className="func-panel-wrapper">
            <button className="button_catalog"></button>
            <form className="search_form" action="submit">
              <input type="text" />
              <button className="button_search-form">Найти</button>
            </form>
            <div className="func-panel_icons">
              <div className="func-panel_icon func-panel_icon_active">
                <img src="./icons/profile.svg" alt="customicon" />
                <div>Войти</div>
              </div>
              <div className="func-panel_icon func-panel_icon_active">
                <img src="./icons/heart.svg" alt="customicon" />
                <div>Избранное</div>
              </div>
              <div className="func-panel_icon func-panel_icon_active">
                <img src="./icons/buy.svg" alt="customicon" />
                <div>Корзина</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
