function AboutProject() {
  return (
    <section id="about" className="about">
      <h2 className="about__title">О проекте</h2>;
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
      <div className="about__scale">
        <div className="about__week about__week_start">
          <span className="about__week-lasts about__week-lasts_left">
            1 неделя
          </span>
          <span className="about__week-title">Back-end</span>
        </div>
        <div className="about__week about__week_finish">
          <span className="about__week-lasts about__week-lasts_right">
            4 недели
          </span>
          <span className="about__week-title">Front-end</span>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;