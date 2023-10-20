import { Link } from 'react-router-dom';
import Logo from '../../images/logo.svg';

export default function AuthForm({ children, name, onSubmit, welcome}) {

  return (
    <>
    <Link to='/' className='form__logo'>
      <img alt='логотип' className='form__logo-img' src={Logo} />
    </Link>
    <h2 className='form__title'>{welcome}</h2>
    <form className="form" onSubmit={onSubmit} name={name} noValidate>
      <div className="form__container">
        {children}
      </div>
      <div className="form__button-container">
        <span className="form__error"></span>
        <button
          className='form__button'
          type="submit"
          aria-label='Кнопка Регистрации'
        >
          {name === 'register' ? 'Зарегистрироваться' : 'Войти'}
        </button>
        <p className="form__message">
          {name === 'register' ? 'Уже зарегистрированы? ' : 'Еще не зарегистрированы? '}
          <Link
            className="form__message-link"
            to={name === 'register' ? '/signin' : '/signup'}
          >
            {name === 'register' ? 'Войти' : 'Регистрация'}
          </Link>
        </p>
      </div>
    </form>
    </>
    
  )
}