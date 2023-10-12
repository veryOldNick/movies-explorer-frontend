import logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  const { pathname } = useLocation();

  const condition = (
    pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile')

  return (
    <header className={`header ${pathname === "/" && "header_color"}`}>
      { condition ?
        <div className="header__container">
          <Link className="header__logo" to="/" />
          {/* <Link className="header__logo" to="/" >
            <img src={logo} alt="изображение логотипа" className="header__logo"/>
          </Link> */}
          {
            loggedIn ? <Navigation /> : 
              <div className="header__links-main">
                <Link to="/signup" className={`header__link-main ${pathname === "/" ? "header__link-main_type_signup" : ''}`}>
                  Регистрация
                </Link>
                <Link to="/signin" className="header__link-main header__link-main_type_signin" >Войти</Link>
              </div>
          }
        </div>
        : ''}
    </header>
  );
}

export default Header;
