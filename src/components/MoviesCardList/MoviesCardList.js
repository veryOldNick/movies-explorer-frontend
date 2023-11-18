import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from '../MoviesCard/MoviesCard'
import {useResize} from '../../utils/CheckResize'

function MoviesCardList(
  {
    movies,
    likedMovies,
    savedMovieList,
    deleteMovieToList,
  }
) {
  const { pathname } = useLocation();
  let size = useResize();
  
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {setVisibleCount(0)}, [movies]);

  const moviesRender = useMemo(() => {
    const count = size.width < 581 ? 5 : size.width < 801 ? 8 : size.width < 1141 ? 9 : 16;
    return movies.slice(0, count + visibleCount);
  }, [movies, visibleCount, size.width]);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + (
      size.width >= 1140 ? 4 : size.width >= 800 ? 3 : 2));
  };

  return (
    <>       
      <section className='movie-cards' aria-label='Карточки фильмов'>
        {moviesRender.length === 0 ? (
          <p className="movie-cards__not-found">Ничего не найдено</p>
        ) : (
          <ul className='movie-cards__container'>            
            {moviesRender.map((movie) => (
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
          movies.length > moviesRender.length &&
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
