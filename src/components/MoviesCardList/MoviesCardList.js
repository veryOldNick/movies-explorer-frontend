import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from '../MoviesCard/MoviesCard'
import {
  BIG_SCREEN_SIZE,
  SMALL_SCREEN_SIZE,
  CARDS_QUANTITY_DESKTOP,
  CARDS_QUANTITY_TABLET,
  CARDS_QUANTITY_MOBILE,
  CARDS_MORE_DESKTOP,
  CARDS_MORE_MOBILE,
} from "../../constants/constants";

function MoviesCardList(
  {
    movies,
    likedMovies,
    savedMovieList,
    deleteMovieToList,
  }
) {
  const { pathname } = useLocation();

  const [visibleMovies, setVisibleMovies] = useState([]); // карточки которые видим
  const [visibleCount, setVisibleCount] = useState(CARDS_QUANTITY_DESKTOP); // количество карточек
  const [loadMoreCount, setLoadMoreCount] = useState(CARDS_MORE_DESKTOP); // количество добавочных карточек
  
  
  // количество показываемых карточек на странице в зависимости от ширины экрана и сколько добавляется кнопкой Еще
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= SMALL_SCREEN_SIZE) {
        setVisibleCount(CARDS_QUANTITY_MOBILE);
        setLoadMoreCount(CARDS_MORE_MOBILE);
      } else if (screenWidth <= BIG_SCREEN_SIZE) {
        setVisibleCount(CARDS_QUANTITY_TABLET);
        setLoadMoreCount(CARDS_MORE_MOBILE);
      } else {
        setVisibleCount(CARDS_QUANTITY_DESKTOP);
        setLoadMoreCount(CARDS_MORE_DESKTOP);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

// количество выводимых карточек в зависимости от блока приложения
useEffect(() => {
  if (pathname === "/movies") {
    setVisibleMovies(movies.slice(0, visibleCount));
  } else if (pathname === "/saved-movies") {
    setVisibleMovies(likedMovies.slice(0, visibleCount));
    setVisibleCount(likedMovies.length);
  }
}, [movies, likedMovies, visibleCount, pathname]);

// дополнительные карточки
function handleShowMore() {
  setVisibleCount((prevVisibleCount) => prevVisibleCount + loadMoreCount)
}; 

  return (
    <>       
      <section className='movie-cards' aria-label='Карточки фильмов'>
        {visibleMovies.length === 0 ? (
          <p className="movie-cards__not-found">Ничего не найдено</p>
        ) : (
          <ul className='movie-cards__container'>            
            {visibleMovies.map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie.id}           
                likedMovies={likedMovies}
                savedMovieList={savedMovieList}
                deleteMovieToList={deleteMovieToList}                
              />
            ))}
          </ul>
        )}          
      </section>
      <div className='more-cards' aria-label='Загрузка больше карточек'>
        <button 
          type='button'
          className='more-cards__button'
          onClick={handleShowMore}
        > Ещё 
        </button>
      </div>
    </>
  )
};

export default MoviesCardList;
