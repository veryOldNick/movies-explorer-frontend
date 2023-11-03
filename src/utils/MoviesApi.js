export const SERVER_URL = 'https://api.nomoreparties.co/beatfilm-movies';

function checkResponse(res) {
	if (!res.ok) {
		return Promise.reject(`Ошибка: ${res.status}`);
	}
	return res.json();
};

export const getAllMovies=  () => { 
    return fetch(SERVER_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    })
    .then((res) => checkResponse(res))
 }