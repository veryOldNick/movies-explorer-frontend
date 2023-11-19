import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/UseformWithValidation';
import { updateUserInfo } from '../../utils/MainApi';
import { EMAIL_EXISTS_ERROR, UPDATE_PROFILE_ERROR } from '../../constants/constants'


function Profile({ isLoading, setIsLoading, setCurrentUser, onSignOut }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSameValues, setIsSameValues] = useState(true);
  const [notificationText, setNotificationText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isSameValues && isValid) {
      // console.log(values);
      if (!values.name) {values.name = currentUser.name};
      if (!values.email) {values.email = currentUser.email};
      updateUserInfo({
                name: values.name,
                email: values.email
              })
                .then((res) => {
                  // console.log(res);
                  if (res.email) {
                    setCurrentUser({ name: res.name, email: res.email });
                    localStorage.setItem('name', res.name);
                    localStorage.setItem('email', res.email);
                    
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
                 
                })

      resetForm();
    }
    setIsDisabled(true);
  };

  useEffect(() => {
    let name = true;
    let email = true;
    if (values.name) {
      name = values.name === currentUser.name;
    }
    if (values.email) {
      email = values.email === currentUser.email;
    }
    setIsSameValues(name && email);
  }, [values.name, values.email, currentUser.name, currentUser.email]);

  useEffect(() => {
    if (!isLoading) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser.name, currentUser.email, isLoading]);

  useEffect(() => {
    if (values.name) {
      setName(values.name);
    }
    if (values.email) {
      setEmail(values.email);
    }
  }, [values.name, values.email]);

  useEffect(() => {
    if (currentUser) {
      resetForm();
    }
  }, [currentUser, resetForm]);

  const handleEditButton = () => {
    setIsDisabled(!isDisabled);
  };

  return (
      <section className='profile'>
        <form 
          className='profile__container' 
          onSubmit={handleSubmit}
          noValidate
        >
          <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
          <div className='profile__form'>
            <label htmlFor='name' className='profile__label'>
              Имя
            </label>
            <input 
            type="text"
            name="name"
            id="profile-input-name"
            className={`profile__input ${
              isDisabled || isLoading ? "profile__input_disabled" : ""
            }`}
            value={values.name || name}
            onChange={handleChange}
            placeholder="Имя"
            required
            minLength="2"
            maxLength="30"
            autoComplete="off"
            pattern="^[a-zA-Zа-яёА-ЯЁ -]+$"
            disabled={isDisabled || isLoading}            
          /> 
          </div>
          <span className='profile__error-message'>{errors.name}</span>
          <div className='profile__form'>
            <label htmlFor='email' className='profile__email-label'>
              E-mail
            </label>
            <input
            type="email"
            name="email"
            id="profile-input-name"
            className={`profile__input ${
              isDisabled || isLoading ? "profile__input_disabled" : ""
            }`}
            value={values.email || email}
            onChange={handleChange}
            placeholder="Email"
            autoComplete="off"
            required
            pattern="^\S+@\S+\.\S+$"
            disabled={isDisabled || isLoading}
            
          />
          </div>
          <span className='profile__error-message'>{errors.email}</span>
            <div className='profile__buttons'>
              <span className='profile__notifaction profile__notifaction_type_error'>{notificationText}</span>
              <button 
              type="submit"
              className={`profile__button ${
                !isValid || isLoading || isSameValues
                  ? "profile__button_disabled"
                  : ""
              }`}
              disabled={!isValid || isLoading || isSameValues}
              >
                Сохранить
              </button>
            </div>
            <div className='profile__buttons'>
              <span className='profile__notifaction profile__notifaction_type_sucсess'>{notificationText}</span>
              <button
                type="button"
                className="profile__link profile__link-edit"
                onClick={handleEditButton}
              >
                {isDisabled ? "Редактировать" : "Отменить"}
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
          </form>
      </section>);
};

export default Profile;
