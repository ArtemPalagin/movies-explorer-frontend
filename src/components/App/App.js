import React from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import HeaderLogged from '../HeaderLogged/HeaderLogged.js';
import Error from '../Error/Error.js';
import * as Authentication from '../../utils/Authentication.js';
import mainApi from "../../utils/MainApi.js";
import moviesApi from '../../utils/MoviesApi.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import createArrayWithLikes from '../../utils/createArrayWithLikes.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationErrorMessage: "",
      loginErrorMessage: "",
      profileErrorMessage: "",
      loggedIn: false,
      currentUser: {},
      likedMovies: [],
      movies: [],
      numberOfMovies: 0,
      keyWord: "",
      shortFilms: false,
    };
  }
  componentDidMount() {
    this.tokenCheck();
  }
  tokenCheck = () => {
    const jwt = localStorage.getItem('token');
    const tryParse = (str) => {
      try {
        return str && JSON.parse(str)
      } catch (e) {
        return null
      }
    }

    if (!jwt) {
      return
    }

    const user = tryParse(localStorage.getItem('user'));
    if (!user) {
      this.userRequest()
    }
    const movies = tryParse(localStorage.getItem('movies'));
    const likedMovies = tryParse(localStorage.getItem('likedMovies'));
    if (movies) {
      this.setState({ movies: movies, likedMovies: likedMovies });
    }

    const numberOfMovies = tryParse(localStorage.getItem('numberOfMovies'));
    if (numberOfMovies) {
      this.setState({ numberOfMovies: numberOfMovies })
    }
    const keyWord = tryParse(localStorage.getItem('keyWord'));
    if (keyWord) {
      this.setState({ keyWord: keyWord })
    }
    const shortFilms = tryParse(localStorage.getItem('shortFilms'));
    if (shortFilms) {
      this.setState({ shortFilms: shortFilms })
    }
    this.setState({ loggedIn: true, currentUser: user });
  }

  registrationRequest = (name, email, password) => {

    Authentication.register(name, email, password).then((resp) => {
      this.setState({ registrationErrorMessage: "" });
      this.loginRequest(resp.data.email, password);
    }).catch((err) => {
      if (err.message) {
        this.setState({ registrationErrorMessage: err.message });
      } else {
        this.setState({ registrationErrorMessage: "что то пошло не так..." });
      }
      console.log(err);
    });
  }
  loginRequest = (email, password) => {

    Authentication.login(email, password).then((data) => {
      localStorage.setItem('token', data.token);
      this.setState({ loggedIn: true, loginErrorMessage: "" });
      // this.props.history.push('/movies');
      this.moviesRequest();
      this.userRequest();
    }).catch((err => {

      if (err.message) {
        this.setState({ loginErrorMessage: err.message });
      } else {
        this.setState({ loginErrorMessage: "что то пошло не так..." });
      }
      console.log(err);
    }))
  }
  profileSubmit = (name, email) => {
    mainApi.patchUser(name, email).then((user) => {
      this.setState({ currentUser: user.data, profileErrorMessage: "", });
      localStorage.setItem('user', JSON.stringify(user.data));
    }).catch((err) => {
      if (err.message) {
        this.setState({ profileErrorMessage: err.message });
      } else {
        this.setState({ profileErrorMessage: "что то пошло не так..." });
      }
      console.log(err);
    })

  }
  moviesRequest = () => {
    moviesApi.getMoviesFromServer().then((movies) => {
      mainApi.getMovies().then((likedMovies) => {
        // debugger
        const filteredMoviesWithLikes = createArrayWithLikes(movies, likedMovies);
        this.setMoviesInStorage(filteredMoviesWithLikes);
        this.setLikedMoviesInStorage(likedMovies);
        this.props.history.push('/movies');
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })

  }
  likedMoviesAdd = (movie) => {
    const newLikedArray = [...this.state.likedMovies, movie];
    const arrayAfterLiked = this.state.movies.map(item => {
      if (movie.id === item.id) {
        return {
          ...item,
          liked: true
        }
      }
      return item;
    })
    this.setLikedMoviesInStorage(newLikedArray);
    this.setMoviesInStorage(arrayAfterLiked);
  }
  likedMoviesRemove = (movie) => {
    const newLikedArray = this.state.likedMovies.filter((elem) => {
      if (elem.id === movie.id) {
        return false
      }
      return true
    })
    const arrayAfterdisliked = this.state.movies.map(item => {
      if (movie.id === item.id) {
        return {
          ...item,
          liked: false
        }
      }
      return item;
    })
    this.setLikedMoviesInStorage(newLikedArray);
    this.setMoviesInStorage(arrayAfterdisliked);
  }
  userRequest = () => {
    mainApi.getUser().then((user) => {
      this.setState({ currentUser: user.data });
      localStorage.setItem('user', JSON.stringify(user.data));
    }).catch((err) => {
      console.log(err);
    })
  }
  loggedChange = () => {
    this.setState({ loggedIn: false });
  }
  setMoviesInStorage = (movies) => {
    localStorage.setItem('movies', JSON.stringify(movies));
    this.setState({ movies: movies });
  }
  setNumberOfMoviesInStorage = (numberOfMovies) => {
    localStorage.setItem('numberOfMovies', JSON.stringify(numberOfMovies));
    this.setState({ numberOfMovies: numberOfMovies });
  }
  setLikedMoviesInStorage = (likedMovies) => {
    localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
    this.setState({ likedMovies: likedMovies });
  }
  setKeyWordInStorage = (keyWord) => {
    localStorage.setItem('keyWord', JSON.stringify(keyWord));
    this.setState({ keyWord: keyWord });
  }
  setShortFilmsInStorage = (shortFilms) => {
    localStorage.setItem('shortFilms', JSON.stringify(shortFilms));
  }
  setShortFilmsInState = (shortFilms) => {
    this.setState({ shortFilms: shortFilms });
  }
  removeState = () => {
    this.setState({ likedMovies: [], movies: [], numberOfMovies: 0, keyWord: "", shortFilms: false,})
  }
  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <div className="page">

          <Switch>

            <Route exact path={["/", "/movies", "/saved-movies", "/profile"]}>
              <Header loggedIn={this.state.loggedIn} />
            </Route>

          </Switch>

          <Switch>

            <Route exact path={["/", "/movies", "/saved-movies", "/profile"]}>
              <HeaderLogged loggedIn={this.state.loggedIn} />
            </Route>

          </Switch>

          <Switch>

            <Route exact path="/">
              <Main />
            </Route>

            <Route exact path="/register">
              <Register registrationRequest={this.registrationRequest} registrationErrorMessage={this.state.registrationErrorMessage} />
            </Route>

            <Route exact path="/sign-in">
              <Login loginRequest={this.loginRequest} loginErrorMessage={this.state.loginErrorMessage} />
            </Route>

            <ProtectedRoute
              path="/movies"
              loggedIn={this.state.loggedIn}
              component={Movies} setShortFilmsInState={this.setShortFilmsInState} movies={this.state.movies} setShortFilmsInStorage={this.setShortFilmsInStorage} setKeyWordInStorage={this.setKeyWordInStorage} setLikedMoviesInStorage={this.setLikedMoviesInStorage} setNumberOfMoviesInStorage={this.setNumberOfMoviesInStorage} setMoviesInStorage={this.setMoviesInStorage} shortFilms={this.state.shortFilms} keyWord={this.state.keyWord} numberOfMovies={this.state.numberOfMovies} likedMovies={this.state.likedMovies} likedMoviesAdd={this.likedMoviesAdd} likedMoviesRemove={this.likedMoviesRemove} />

            <ProtectedRoute
              path="/saved-movies"
              loggedIn={this.state.loggedIn}
              component={SavedMovies} setLikedMoviesInStorage={this.setLikedMoviesInStorage} likedMovies={this.state.likedMovies} likedMoviesRemove={this.likedMoviesRemove} />

            <ProtectedRoute
              path="/profile"
              loggedIn={this.state.loggedIn}
              component={Profile} removeState={this.removeState} profileSubmit={this.profileSubmit} profileErrorMessage={this.state.profileErrorMessage} loggedChange={this.loggedChange} />

            <Route path="/">
              <Error />
            </Route>

          </Switch>

          <Switch>

            <Route exact path={["/", "/movies", "/saved-movies", "/profile"]}>
              <Footer />
            </Route>

          </Switch>
        </div >
      </CurrentUserContext.Provider>
    )
  }
}

export default withRouter(App);