// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { timeTransform } from "../../utils/utils";
// import { addFavoriteMovie, deleteFavoriteMovie } from '../../utils/MainApi';

import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { API__URL } from "../../utils/MainApi";





export default function MoviesCard(
  {
    movie,
    likedMovies,
    setLikedMovies,
    savedMovieList,
    deleteMovieToList,
  }
) {
  const { pathname } = useLocation();
  const [isLiked, setIsLiked] = useState(false); // лайк, сохранение
  const [likeDisabled, setLikeDisabled] = useState(false);

  useEffect(() => {
    if (likedMovies) {
      likedMovies.map((item) => {
        if (item.movieId === movie.id) {
          setIsLiked(true);
          movie._id = item._id;
        }
      });
    }
  }, [likedMovies, movie]);

  function handleLikeClick() {
    setLikeDisabled(true);
    if (isLiked || pathname === "/saved-movies") {
      deleteFavoriteMovie(movie)
        .then(() => {
          setIsLiked(false);
          setLikedMovies((state) => state.filter(arrayItem => arrayItem._id !== movie._id));
          setLikeDisabled(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      addFavoriteMovie(movie)
        .then((res) => {
          setIsLiked(true);
          setLikedMovies([...likedMovies, res]);
          setLikeDisabled(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
      <button
        className={`movies-card__like ${pathname === "/saved-movies" && 'movies-card__like_delete'}
        ${isLiked && 'movies-card__like_active'}`}
        type='button'
        disabled={likeDisabled}
        onClick={handleLikeClick}
      />
    </div>
  <p className='movie-card__duration'>{timeTransform(movie.duration)}</p>
</li>
  );
}