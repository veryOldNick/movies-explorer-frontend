import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { timeTransform } from "../../utils/utils";
import { saveMovie, deleteMovie } from '../../utils/MainApi';

export default function MoviesCard(
  {
    movie,
    likedMovies,
    savedMovieList,
    deleteMovieToList,
    setLikedMovies
  }
) {
  const { pathname } = useLocation();
  const [isLiked, setIsLiked] = useState(false);
  
  // const isSaved = useMemo(() => {
  //   return likedMovies.some((m) => m.movieId === movie.id);
  // }, [movie, likedMovies]);

  // function handleSaveMovie() {!isSaved ? savedMovieList(movie) : deleteMovieToList(movie)};
  // function handleDeleteMovie() {return deleteMovieToList(movie)}; 

  useEffect(() => {
    if (likedMovies) {
      likedMovies.map((m) => {
        if (m.movieId === movie.id) { setIsLiked(true); movie._id = m._id }
      });
    }
  }, [likedMovies, movie])

function handleLikeClick() {  
  if (isLiked || pathname === "/saved-movies") {
    deleteMovie(movie._id)
      .then(() => {
        setIsLiked(false);
        setLikedMovies((state) => state.filter(arrayItem => arrayItem._id !== movie._id));
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    saveMovie(movie)
      .then((res) => {
        setIsLiked(true);
        setLikedMovies([...likedMovies, res]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const cardLikeButtonClass = (`movies-card__like ${pathname === "/saved-movies" && 'movies-card__like_delete'}
${isLiked && 'movies-card__like_active'}`);

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
      <button
        className={cardLikeButtonClass}
        type='button'
        onClick={handleLikeClick}/>
    </div>
    <p className='movie-card__duration'>{timeTransform(movie.duration)}</p>
  </li>
  );
};
