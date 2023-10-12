import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import img from "../../../images/movie_shot.jpg";

export default function MoviesCard() {
  const { pathname } = useLocation();
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeClick() {setIsLiked(!isLiked)};

  const deleteCard = (pathname === "/saved-movies" && 'movies-card__like_delete');
  const cardLikeButtonClass = (
    `movies-card__like ${deleteCard} ${isLiked && 'movies-card__like_active'}`);  

  return (
  <li className='movie-card'>
    <img src={img} className='movie-card__image' alt="Кадр фильма" />
    <div className='movie-card__info'>
      <h2 className='movie-card__name'>33 слова о дизайне</h2>
      <button
        className={cardLikeButtonClass}
        type='button'
        onClick={handleLikeClick}/>
    </div>
    <p className='movie-card__duration'>1ч 42м</p>
  </li>
  );
}