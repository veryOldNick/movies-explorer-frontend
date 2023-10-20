import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom'

function Navigation() {
  const location = useLocation();

  const [isMenu, setButton] = useState(false);
  function handleOpenMenu() {setButton(true)};
  function handleCloseMenu() {setButton(false)};

    return (
    <>
      <ul className='header__navigation'>
        <li>
          <NavLink 
            to='/movies' 
            className={
              `header__link ${ location.pathname === '/movies' 
              ? 'header__link_active' 
              : '' }`}
          >
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink 
            to='/saved-movies' 
            className={`header__link ${ location.pathname === '/saved-movies' 
            ? 'header__link_active' 
            : '' }`}
          >
            Сохраненные фильмы
          </NavLink>
        </li>
      </ul>
      <div className='header__account'>
        <NavLink 
          to='/profile' 
          className='header__link header__link_account'
        >
          Аккаунт
          <span className='header__img-account'></span>
        </NavLink>
      </div>
      <div className='header__menu'>
        <button 
          className='header__link header__menu-button' 
          aria-label='меню' type='button' 
          onClick={handleOpenMenu}
        ></button>
      </div>
      {/* </NavMenu> */}
      <div className={`navigation ${isMenu ? 'navigation_visible' : ''}`}>
        <div className='navigation__container'>
          <div className='navigation__button'>
            <button 
              className='navigation__button_close' 
              onClick={handleCloseMenu}
            ></button>
          </div>
          <div className='navigation__links'>
            <Link className='navigation__link' to='/'>
              Главная
            </Link>
            <Link 
              className={
                `navigation__link ${location.pathname === '/movies' && 'navigation__link_active'}`} 
                to='/movies'
            >
              Фильмы
            </Link>
            <Link 
              className={
                `navigation__link ${location.pathname === '/saved-movies' && 'navigation__link_active'}`} 
                to='/saved-movies'
              >
              Сохранённые фильмы
            </Link>
          </div>
          <div className='navigation__button navigation__button_account'>
            <Link to='/profile' className='navigation__account-link'>
              Аккаунт
              <span className='navigation__img-account'></span>
            </Link>
          </div>
        </div>
      </div>
    </>
    );
  }

  export default Navigation;
