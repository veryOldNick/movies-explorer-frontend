import { useNavigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';

function Register({setLoggedIn}) {
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();
    navigate('/movies');
    setLoggedIn(true);
  };

  return (
    <main className='register'>
      <div className='register__container'>
        <AuthForm
          name= {'register'}
          onSubmit={handleSubmit}
          welcome = {'Добро пожаловать!'}
        >
          <fieldset className='form__fieldset'>
            <label htmlFor='name' className='form__label'>
              Имя
            </label>
            <input 
              className='form__input'
              type='text' 
              id='name'
              name='name'
              minLength='2'
              required
              placeholder='Введите имя'/>
            <span className='form__input-error'>{}</span>
          </fieldset>
          <fieldset className='form__fieldset'>
            <label htmlFor='email' className='form__label'>
              E-mail:
            </label>
            <input              
              className='form__input'
              type='email'
              id='email'
              name='email'
              minLength='2'
              required
              placeholder='Введите Email' />
            <span className='form__input-error'>{}</span>
          </fieldset>
          <fieldset className='form__fieldset'> 
            <label htmlFor='password' className='form__label'>
              Пароль
            </label>
            <input
              className='form__input'
              type='password'
              id='password'
              name='password'
              minLength='6'
              required 
              placeholder='Придумайте пароль'/>
            <span className='form__input-error'>Что-то пошло не так...</span>
          </fieldset>
        </AuthForm> 
      </div>
    </main>
  );
}
export default Register;