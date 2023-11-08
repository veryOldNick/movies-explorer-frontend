import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images/logo.svg';

export default function AuthForm({ children, name, onSubmit, isLoading, isButtonDisable,  errorText, welcome}) {

  const isRegister = name === 'register';
  const navigate = useNavigate();
  const to = name === 'register' ? '/signin' : '/signup';

  return (
    <>
    <button 
      className="form__logo"
      onClick={() => {navigate('/')}}
    >
      <img alt='логотип' className='form__logo-img' src={Logo}/>
    </button>
    <h2 className='form__title'>{welcome}</h2>
    <form className="form" onSubmit={onSubmit} name={name} noValidate>
      <div className="form__container">
        {children}
      </div>
      <div className="form__button-container">
        <span className="form__error">{errorText}</span>
        <button
          className={`form__button form__button_type_${ isLoading || isButtonDisable ? 'disable' : ''}`}
          type="submit"
          disabled = {isLoading || isButtonDisable}
          aria-label='Кнопка Регистрации'
        >
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </button>
        <p className="form__message">
          {isRegister ? 'Уже зарегистрированы? ' : 'Еще не зарегистрированы? '}
          <button 
          className="form__message-link"
          onClick={() => {navigate(to)}}
        >
          {isRegister ? 'Войти' : 'Регистрация'}
        </button>
        </p>
      </div>
    </form>
    </>
  )
}
