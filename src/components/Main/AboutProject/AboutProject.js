function AboutProject() {
  return (
    <section id="about" className="about">
      <h2 className="about__title">О проекте</h2>
      <ul className="about__list">
        <li>
          <h3 className="about__article-title">Дипломный проект включал 5 этапов</h3>
          <p className="about__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li>
          <h3 className="about__article-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className='about__timeline'>
            <p className='about__timeline-week about__timeline_left'>1 неделя</p>
            <p className='about__timeline-week about__timeline_right'>4 недели</p>
            <p className='about__timeline-caption about__timeline_back'>Back-end</p>
            <p className='about__timeline-caption about__timeline_front'>Front-end</p>
        </div>
    </section>
  );
}

export default AboutProject;
