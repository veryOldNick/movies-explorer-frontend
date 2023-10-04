function Footer() {
  return (
  <footer className='footer'>
    <div className='footer__container'>
      <h3 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__info">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__list">
          <li className="footer__list-item">
            <a 
              className="footer__link"
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel='noopener noreferrer'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__list-item">
            <a
              className="footer__link"
              href="https://github.com/veryOldNick"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
  )
};
  
export default Footer;
