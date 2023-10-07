import author from '../../../images/author.jpg';

function AboutMe() {
  return (
    <section className='about-me' aria-label='Инормация о студенте'>
      <article className='about-me__article'>
        <h2 className='about-me__title'>Студент</h2>
        <div className='about-me__info'>
          <div className='about-me__infoblock'>
            <h3 className='about-me__info-name'>Виталий</h3>
            <p className='about-me__info-role'>Фронтенд-разработчик, 30 лет</p>
            <p className='about-me__info-description'>
              Я родился и живу в Саратове, закончил факультет экономики СГУ. 
              У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. 
              Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
              После того, как прошёл курс по веб-разработке, 
              начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a className='about-me__link' href='https://github.com/veryOldNick' target='_blank' rel='noreferrer'>
              Github
            </a>
          </div>
          <img className='about-me__photo' src={author} alt='фото автора'/>
        </div>
      </article>
    </section>
  );
}

export default AboutMe;