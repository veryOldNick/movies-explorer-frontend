import { useState } from 'react';

function Profil() {
  const [name, setName] = useState('Виталий');
  const [email, setEmail] = useState('ya@ya.ru');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <section className='profile'>
      <div className='profile__container'>
        <h1 className='profile__title'>Привет, {name}!</h1>
        <label className='profile__form'>
          <span htmlFor='name' className='profile__name-label'>
            Имя
          </span>            
          <input 
            className='profile__input' 
            type='text' 
            name='name' 
            minLength='2' 
            value={name} 
            onChange={handleNameChange} 
          /> 
        </label>
        <label className='profile__form'>
          <span htmlFor='email' className='profile__email-label'>
            E-mail
          </span>
          <input 
            className='profile__input' 
            type='email' 
            name='email' 
            value={email} 
            onChange={handleEmailChange} 
          /> 
        </label>
        <button 
          type='button' 
          className='profile__link profile__link profile__link-edit' 
          href='/' 
          aria-label='Редактировать профиль'
        >
          Редактировать
        </button>
        <button 
          type='button' 
          className='profile__link profile__link-exit' 
          href='/signout' 
          aria-label='Выйти из аккаунта'
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profil;
