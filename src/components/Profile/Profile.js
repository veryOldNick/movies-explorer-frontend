import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/UseformWithValidation';
import { updateUserInfo } from '../../utils/MainApi';
import { EMAIL_EXISTS_ERROR, UPDATE_PROFILE_ERROR } from '../../constants/constants'


function Profil({ isLoading, setIsLoading, setCurrentUser, onSignOut }) {
  const { values, handleChange, errors, isValid, setValues } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  const [disabledButton, setDisabledButton] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [notificationText, setNotificationText] = useState('');


  function handleisEdit() {
    setIsEdit(!isEdit);
    setNotificationText('');
  };

  useEffect(() => {
    if (values['name'] === currentUser.name && values['email'] === currentUser.email) {
      setDisabledButton(true);
      console.log('no')
    } else {
      setDisabledButton(false);
      setNotificationText('');
    }
  }, [values])
  

  useEffect(() => {
    values.name = currentUser.name;
    values.email = currentUser.email;
  }, [])

 

  useEffect(() => {
    if (!values.name || !values.email) {
      setDisabledButton(true);
    } 
  }, [values.name, values.email]);
 
  function handleSubmit(evt) {
      evt.preventDefault();
      setIsLoading(true);
      setNotificationText('');
  
      updateUserInfo({
        name: values.name,
        email: values.email
      })
        .then((res) => {
          if (res.email) {
            setCurrentUser({ name: res.name, email: res.email });
            localStorage.setItem('name', res.name);
            localStorage.setItem('email', res.email);
            setIsEdit(false);
            setNotificationText('Данные обновлены!');
          } else {
            return Promise.reject(res.status);
          }
        })
        .catch((err) => {
          if (err === 409) {
            setNotificationText(EMAIL_EXISTS_ERROR);
          }
          setNotificationText(UPDATE_PROFILE_ERROR);
        })
        .finally(() => {
          setIsLoading(false);
         setDisabledButton(true);
        })
    };

  return (
    <>
      <section className='profile'>
        <form className='profile__container' onSubmit={handleSubmit}>
          <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
          <div className='profile__form'>
            <label htmlFor='name' className='profile__label'>
              Имя
            </label>
            <input 
            className='profile__input'
            placeholder="Введите имя"
            type='text'
            name='name'
            minLength='2'
            value={!isEdit ? values.name : currentUser.name || ''}
            pattern='[a-zA-Zа-яёА-ЯЁ\-\s]+'
            onChange={handleChange}
            // disabled= {!isEdit} 
          /> 
          </div>
          <span className='profile__error-message'>{errors.name}</span>
          <div className='profile__form'>
            <label htmlFor='email' className='profile__email-label'>
              E-mail
            </label>
            <input
            className='profile__input'
            placeholder="Введите email"
            type='email'
            name='email'
            value={!isEdit ? values.email : currentUser.email || ''}
            pattern='^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'
            onChange={handleChange} 
            // disabled= {!isEdit} 
            />
          </div>
          <span className='profile__error-message'>{errors.email}</span>

          {isEdit ? (
            <div className='profile__buttons'>
              <span className='profile__notifaction profile__notifaction_type_error'>{notificationText}</span>
              <button 
              type='submit'
              className={`profile__button ${isLoading || !isValid || disabledButton ? 'profile__button_disabled' : 'profile__button_active'}`}
              aria-label='Сохранить данные'
              // disabled={isLoading || !isValid || disabledButton}
              >
                Сохранить
              </button>
            </div>
          ) : (
            <div className='profile__buttons'>
              <span className='profile__notifaction profile__notifaction_type_sucсess'>{notificationText}</span>
              <button 
                type='button' 
                className='profile__link profile__link-edit' 
                onClick={handleisEdit} 
                aria-label='Редактировать профиль' 
              >
                Редактировать
              </button>
              <button 
                type='button' 
                className='profile__link profile__link-exit' 
                onClick={onSignOut} 
                href='/' aria-label='Выйти из аккаунта'
              >
                Выйти из аккаунта
              </button>
            </div>
          )}
          </form>
      </section>
    </>
  );
}

export default Profil;
