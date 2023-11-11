import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

// import img from "../../images/movie_shot.jpg";

export default function MoviesCard(
  {
    movie,
  }
) {
  // const { pathname } = useLocation();
  // const [isLiked, setIsLiked] = useState(false);

  // function handleLikeClick() {setIsLiked(!isLiked)};

  // const deleteCard = (pathname === "/saved-movies" && 'movies-card__like_delete');
  // const cardLikeButtonClass = (
  //   `movies-card__like ${deleteCard} ${isLiked && 'movies-card__like_active'}`);  

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
      {/* <button
        className={`movies-card__like ${pathname === "/saved-movies" && 'movies-card__like_delete'}
        ${isLiked && 'movies-card__like_active'}`}
        type='button'
        disabled={likeDisabled}
        onClick={handleLikeClick}
      /> */}
    </div>
  {/* <p className='movie-card__duration'>{timeTransform(movie.duration)}</p> */}
</li>
  );
}