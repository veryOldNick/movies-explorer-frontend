import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';

import { useFormWithValidation } from '../../utils/UseformWithValidation';
import { registration, authorization } from '../../utils/MainApi';
import { EMAIL_EXISTS_ERROR, REGISTER_ERROR, CONFLICT_ERR } from '../../constants/constants'

function Register({setLoggedIn, isLoading, setIsLoading, setCurrentUser}) {

  const [errorText, setErrorText] = useState('');
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const navigate = useNavigate();

  function handleRegister (evt) {
    evt.preventDefault();
    setIsLoading(true);
    setErrorText('');    
    
    registration(
      {
      name: values['name'],
      email: values['email'],
      password: values['password'],
      }
    )
      .then((res) => {               
        if (res.email) {
          setCurrentUser({ name: res.name, email: res.email });
          
          localStorage.setItem('name', res.name);
          localStorage.setItem('email', res.email);
        } else {
          return Promise.reject(res.status);
        }
      }) 
        .then (() => {
          authorization({
            email: values['email'],
            password: values['password'],
        })
          .then((user) => {
            if (user.token) {
              localStorage.setItem('token', user.token);
              setLoggedIn(true);
              resetForm();
              navigate('/movies', { replace: true });
            } else {
              return Promise.reject(user.status);
            }
          })
        })
        .catch((err) => {
          if (err === CONFLICT_ERR) {
            setErrorText(EMAIL_EXISTS_ERROR);  
          }
            setErrorText(REGISTER_ERROR);
        })
        .finally(() => setIsLoading(false));      
}

  return (
    <main className='register'>
      <div className='register__container'>
        <AuthForm
          name= {'register'}
          onSubmit={handleRegister}
          isLoading={isLoading}
          isButtonDisable={!isValid}
          errorText={errorText}
          welcome={'Рады видеть!'}
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
                value={values['name'] || ''}
                onChange={handleChange}
                minLength='2'
                required
                placeholder='Введите имя'
                pattern='[a-zA-Zа-яёА-ЯЁ\-\s]+'
                title='Имя» должно содержать только буквы латиницы, кириллицы, пробел или дефис' />
              <span className='form__input-error'>{errors.name}</span>
            </fieldset>
            <fieldset className='form__fieldset'>
              <label htmlFor='email' className='form__label'>
                E-mail:
              </label>
              <input 
                required
                className='form__input'
                type='email'
                id='email'
                name='email'
                value={values['email'] || ''}
                onChange={handleChange}
                pattern='^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'
                placeholder='Введите Email' 
                title='' />
              <span className='form__input-error'>{errors.email}</span>
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
                value={values['password'] || ''}
                onChange={handleChange}
                minLength='5'
                required 
                placeholder='Придумайте пароль'
                title='Пароль не менее 5 знаков' />
              <span className='form__input-error'>{errors.password}</span>
            </fieldset>
        </AuthForm> 
      </div>
    </main>
  );
}
export default Register;