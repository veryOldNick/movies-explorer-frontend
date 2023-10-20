import { useNavigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';

function Login({setLoggedIn}) {
  const navigate = useNavigate();
  
  function handleSubmit(evt) {
    evt.preventDefault();
    navigate('/movies');
    setLoggedIn(true);
    }
  return (
    <main className='login'>
      <div className= 'login__container'>
        <AuthForm
          name= {'login'}
          onSubmit={handleSubmit}
          welcome={'Рады видеть!'}
        >
             <fieldset className='form__fieldset'>
              <label htmlFor='name' className='form__label'>
                E-mail
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
              <label htmlFor='email' className='form__label'>
                Пароль
              </label>
              <input 
                className='form__input'
                type='password' 
                id='name'
                name='passwaord'
                minLength='4'
                required
                placeholder='Пароль'/>
              <span className='form__input-error'>{}</span>
            </fieldset>
        </AuthForm> 
      </div>
    </main>
  );
}

export default Login;
