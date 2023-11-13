import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { timeTransform } from "../../utils/utils";

export default function MoviesCard(
  {
    movie,
    likedMovies,
    savedMovieList,
    deleteMovieToList,
  }
) {
  const { pathname } = useLocation();
  // const [isLiked, setIsLiked] = useState(false); // лайк, сохранение
  // const [likeDisabled, setLikeDisabled] = useState(false);

  const isSaved = useMemo(() => {
    return likedMovies.some((m) => m.movieId === movie.id);
  }, [movie, likedMovies]);

  function handleSaveMovie() {
    !isSaved ? savedMovieList(movie) : deleteMovieToList(movie);
  }

  function handleDeleteMovie() {
    return deleteMovieToList(movie);
  } 

  return (
   <li className='movie-card'>
    <a href={`${movie.trailerLink}`} target="_blank" rel="noreferrer">
      <img 
        src={movie.image.url ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image}
        className='movie-card__image'
        alt="Кадр фильма" />
    </a>
    <div className='movie-card__info'>
      <h2 className='movie-card__name'>{movie.nameRU}</h2>

      {pathname === "/movies" && (
        <button
          className={`movies-card__like ${isSaved ? "movies-card__like_active" : ""}`}
          onClick={handleSaveMovie}>
        </button>
      )}

      {pathname === "/saved-movies" && (
        <button
          className="movies-card__like movies-card__like_delete"
          onClick={handleDeleteMovie}
        />
      )}

      {/* <button
        className={`movies-card__like ${pathname === "/saved-movies" && 'movies-card__like_delete'}
        ${isSaved && 'movies-card__like_active'}`}
        type='button'
        disabled={handleDeleteMovie}
        onClick={handleSaveMovie}
      /> */}
    </div>
  <p className='movie-card__duration'>{timeTransform(movie.duration)}</p>
</li>
  );
}