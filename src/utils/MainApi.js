import { checkResponse } from '../utils/checkResponse';

export const BASE_URL = 'http://localhost:3000';

export function registration({name, email, password}) {
  // console.log({name, email, password});
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
export function addFavoriteMovie(movie) {
	const token = localStorage.getItem('token')
	return (
		fetch(`${BASE_URL}/movies`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				country: movie.country,
				director: movie.director,
				duration: movie.duration,
				year: movie.year,
				description: movie.description,
				image: `https://api.nomoreparties.co${movie.image.url}`,
				trailerLink: movie.trailerLink,
				thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
				movieId: movie.id,
				nameRU: movie.nameRU,
				nameEN: movie.nameEN,
			}),
		}).then((res) => checkResponse(res))
	)
};

// удаляние любимого фильма
export function deleteFavoriteMovie(movie) {
	console.log('hey, delete', movie._id);
	return (
		fetch(`${BASE_URL}/movies/${movie._id}`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
		}).then((res) => checkResponse(res))
	)
};

// export const deleteMovie = (movieId) => {
//   return fetch(`${BASE__URL}/movies/${movieId}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//     },
//   })
//     .then(getResponse)
//     .then((data) => {
//       return data;
//     });
// };


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

