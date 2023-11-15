export const SERVER_URL = 'https://api.nomoreparties.co/beatfilm-movies';

// получение карточек из внешнего каталога
export const getAllMovies = () => {
  return fetch(`${SERVER_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => 
  {
    if (res.ok) {      
      return res.json();
    } else {
      throw new Error("Не удалось получить данные по API");
    }
  }
  );
};
