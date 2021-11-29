import { handleStatus } from "./utils.js";

export class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this.contentType = options.contentType;
  }
  getUser() {
    return fetch(`${this._baseUrl}`).then(handleStatus)
  }
}
const moviesApi = new MoviesApi({
  baseUrl: "http://api.nomoreparties.co/beatfilm-movies",
});

export default moviesApi;