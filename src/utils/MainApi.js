import { handleStatus, findToken } from "./utils.js";

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this.contentType = options.contentType;
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'authorization': findToken(),
        'Content-Type': this.contentType
      }
    }).then(handleStatus)
  }
  patchUser(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'authorization': findToken(),
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    }).then(handleStatus)
  }
  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        'authorization': findToken(),
        'Content-Type': this.contentType
      }
    }).then(handleStatus);
  }
  postMovie(country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'authorization': findToken(),
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        country: country,
        director: director,
        duration: duration,
        year: year,
        description: description,
        image: image,
        trailer: trailer,
        nameRU: nameRU,
        nameEN: nameEN,
        thumbnail: thumbnail,
        movieId: movieId,
      })
    }).then(handleStatus)
  }
  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'authorization': findToken(),
        'Content-Type': this.contentType
      }
    }).then(handleStatus)
  }

}
const mainApi = new MainApi({
  baseUrl: "https://api.plg.movies.students.nomoredomains.rocks",
  contentType: "application/json",
});

export default mainApi;