import logo from '../../../images/text__COLOR_landing-logo.svg';

function Promo() {
  return (
    <section className="promo">
      <div className='promo__container'>
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className='promo__description'>
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <a className='promo__link' href='#about'>
          Узнать больше
        </a>
      </div>
      <img className='promo__img' alt='Глобус' src = {logo}/>
    </section>
  );
}

export default Promo;
