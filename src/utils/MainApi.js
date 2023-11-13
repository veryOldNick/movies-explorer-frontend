import { checkResponse } from '../utils/checkResponse';

// export const BASE_URL = 'http://localhost:3000';
export const API__URL = "https://api.nomoreparties.co/";
export const BASE__URL = "https://api.movie.nomoredomainsrocks.ru";

// регистрация
export function registration({name, email, password}) {
	return (
		fetch(`${BASE_URL}/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json',
			      		  'Accept': 'application/json',
									
		},
			body: JSON.stringify({name, email, password})
		}
		
		).then((res) => checkResponse(res))
	)
};

// авторизация
export function authorization({email, password}) {
	return (
		fetch(`${BASE_URL}/signin`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		}).then((res) => checkResponse(res))
	)
};

// проверяем токен 
export function checkToken(token) {
	return (
		fetch(`${BASE_URL}/users/me`, {
			method: 'GET',
			headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` },
		}).then((res) => checkResponse(res))
	)
};

// информация о пользователе с сервера
export function getUserInfo() {
	const token = localStorage.getItem('token')
	return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
		headers: {
			authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	}).then((res) => checkResponse(res))
};

// update profile
export function updateUserInfo({ email, name }) {
	const token = localStorage.getItem('token')
	return fetch(`${BASE_URL}/users/me`, {
		method: 'PATCH',
		headers: {
			authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, name })
	}).then((res) => checkResponse(res))
};

// сохраняем фильм
export const saveMovie = (data) => {
	return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      nameRU: data.nameRU,
      nameEN: data.nameEN,
      country: data.country,
      duration: data.duration,
      director: data.director,
      year: data.year,
      description: data.description,
      image: `${API__URL}${data.image.url}`,
      trailerLink: data.trailerLink,
      thumbnail: `${API__URL}${data.image.formats.thumbnail.url}`,
      movieId: data.id,
    }),
  }).then(checkResponse);
};

// удаляние любимого фильма
export const deleteMovie = (_id) => {
	const token = localStorage.getItem('token')
	return fetch(`${BASE_URL}/movies/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse);
};

// сохранить любимый movie
export function getSavedMovies () {
	const token = localStorage.getItem('token')
	return fetch(`${BASE_URL}/movies`, {
		headers: {
			method: 'GET',
			authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	}).then((res) => checkResponse(res))
};
