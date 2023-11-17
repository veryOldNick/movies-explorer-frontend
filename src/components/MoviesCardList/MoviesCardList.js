import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from '../MoviesCard/MoviesCard'
import {
  BIG_SCREEN_SIZE,
  MED_SCREEN_SIZE,
  SMALL_SCREEN_SIZE,
  X_SMALL_SCREEN_SIZE,
  CARDS_QUANTITY_DESKTOP,
  CARDS_QUANTITY_TABLET,
  CARDS_QUANTITY_TABLET_3INLINE,
  CARDS_QUANTITY_MOBILE,
  CARDS_MORE_DESKTOP,
  CARDS_MORE_TABLET,
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

  function setsize (visible, more) {
    setVisibleCount(visible);
    setLoadMoreCount(more);
    console.log(3, visible, more);
  };
  
  
  useEffect(() => {
    const handleResize = () => {
      let screenWidth = window.innerWidth;      

      if (screenWidth <= SMALL_SCREEN_SIZE) {
        setsize(CARDS_QUANTITY_MOBILE, CARDS_MORE_MOBILE);
      } else if (screenWidth <= BIG_SCREEN_SIZE) {
        setsize(CARDS_QUANTITY_TABLET, CARDS_MORE_MOBILE);
      } else {
        setsize(CARDS_QUANTITY_DESKTOP, CARDS_MORE_DESKTOP);
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
      {pathname === "/movies"
        ? 
          movies.length > likedMovies.length &&
            <div className="more-cards">
              <button
                className="more-cards__button"
                type="button"
                onClick={handleShowMore}
              >
                Еще
              </button>
            </div>
            : 
            ""
      }
    </>
  )
};

export default MoviesCardList;
