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
import mainApi from "../../utils/MainApi.js"
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

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
    const likedMovies = tryParse(localStorage.getItem('likedMovies'));
    if(likedMovies){
      this.setState({ likedMovies: likedMovies})
    }
    this.setState({ loggedIn: true, currentUser: user });
    this.props.history.push("/movies");
  }

  registrationRequest = (name, email, password) => {

    Authentication.register(name, email, password).then((resp) => {
      this.setState({ registrationErrorMessage: "" });
      this.loginRequest(resp.data.email, password);
    }).catch((err) => {
      this.setState({ registrationErrorMessage: err.message });
      console.log(err);
    });
  }
  loginRequest = (email, password) => {

    Authentication.login(email, password).then((data) => {
      localStorage.setItem('token', data.token);
      this.setState({ loggedIn: true, loginErrorMessage: "" });
      this.props.history.push('/movies');
      this.moviesRequest();
      this.userRequest();
    }).catch((err => {
      // debugger
      this.setState({ loginErrorMessage: err.message });
      console.log(err);
    }))
  }
  profileSubmit = (name, email) => {
    mainApi.patchUser(name, email).then((user) => {
      this.setState({ currentUser: user.data, profileErrorMessage: "", });
      localStorage.setItem('user', JSON.stringify(user.data));
    }).catch((err) => {
      this.setState({ profileErrorMessage: err.message });
      console.log(err);
    })

  }
  moviesRequest = () => {
    mainApi.getMovies().then((movies) => {
      this.setState({ likedMovies: movies });
      localStorage.setItem('likedMovies', JSON.stringify(movies));
    }).catch((err) => {
      console.log(err);
    })
  }
  likedMoviesAdd = (movie) => {
    const newLikedArray = [...this.state.likedMovies, movie]
    this.setState({ likedMovies: newLikedArray });
    localStorage.setItem('likedMovies', JSON.stringify(newLikedArray));
  }
  likedMoviesRemove = (movie) => {
    const newLikedArray = this.state.likedMovies.filter((elem) => {
      if(elem.id === movie.id){
        return false
      }
      return true
    })
    this.setState({ likedMovies: newLikedArray });
    localStorage.setItem('likedMovies', JSON.stringify(newLikedArray));
  }
  userRequest = () => {
    mainApi.getUser().then((user) => {
      this.setState({ currentUser: user.data });
      localStorage.setItem('user', JSON.stringify(user.data));
    }).catch((err) => {
      console.log(err);
    })
  }
  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <div className="page">

          <Switch>

            <Route exact path="/">
              <Header />
            </Route>

            <Route exact path={["/movies", "/saved-movies", "/profile"]}>
              <HeaderLogged />
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
              component={Movies} likedMovies={this.state.likedMovies} likedMoviesAdd={this.likedMoviesAdd} likedMoviesRemove={this.likedMoviesRemove} />

            <ProtectedRoute
              path="/saved-movies"
              loggedIn={this.state.loggedIn}
              component={SavedMovies} likedMovies={this.state.likedMovies} likedMoviesRemove={this.likedMoviesRemove} />

            <ProtectedRoute
              path="/profile"
              loggedIn={this.state.loggedIn}
              component={Profile} profileSubmit={this.profileSubmit} profileErrorMessage={this.state.profileErrorMessage} />

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