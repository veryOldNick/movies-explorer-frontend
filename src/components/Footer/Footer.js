import { useLocation } from 'react-router-dom';

function Footer() {
  const { pathname } = useLocation();
  const condition = pathname === "/" || pathname === "/movies" || pathname === "/saved-movies"
  return (
    <>
      { condition ?
        (
        <footer className='footer'>
          <div className='footer__container'>
            <h3 className='footer__title'>
              Учебный проект Яндекс.Практикум х BeatFilm.
            </h3>
            <div className='footer__info'>
              <p className='footer__copyright'>&copy; {new Date().getFullYear()}</p>
              <div className='footer__links'>
                <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank'rel='noopener noreferrer'>
                  Яндекс.Практикум
                </a>
                <a className='footer__link' href='https://github.com/veryOldNick' target='_blank' rel='noopener noreferrer'>
                  Github
                </a>
              </div>
            </div>
          </div>
        </footer>
        ):('')
      }
    </>
  );
};

export default Footer;
