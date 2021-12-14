import { handleStatus, findToken } from "./utils.js";
import ensureServer from "../utils/ensureServer.js";
import changeFormat from "./changeFormat.js";

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
    }).then(handleStatus).then(resp => {
      // debugger
      return resp.data.map(changeFormat)
    })
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
        image: ensureServer(image),
        trailer: trailer,
        nameRU: nameRU,
        nameEN: nameEN,
        thumbnail: ensureServer(thumbnail),
        movieId: movieId,
      })
    }).then(handleStatus).then(resp => {
      // debugger
      return changeFormat(resp.data)
    })
  }
  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'authorization': findToken(),
        'Content-Type': this.contentType
      }
    }).then(handleStatus).then(resp => {
      // debugger
      return changeFormat(resp)
    })
  }

}
const mainApi = new MainApi({
  baseUrl: "https://api.plg.movies.students.nomoredomains.rocks",
  contentType: "application/json",
});

export default mainApi;