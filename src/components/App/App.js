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
      cards: [],
      loggedIn: false,
      currentUser: {},
    };
  }
  componentDidMount() {
    this.tokenCheck();
  }
  tokenCheck = () => {
    const jwt = localStorage.getItem('token');
    if (!jwt) {
      return
    }
    this.setState({ loggedIn: true });
    this.props.history.push("/movies");
  }

  registrationRequest = (name, email, password) => {

    Authentication.register(name, email, password).then((resp) => {
      this.loginRequest(resp.data.email, password);
    }).catch((err) => {
      console.log(err);
    });
  }
  loginRequest = (email, password) => {

    Authentication.login(email, password).then((data) => {
      localStorage.setItem('token', data.token);
      this.setState({ loggedIn: true });
      this.props.history.push('/movies');
    }).catch((err => {
      console.log(err);
    }))
  }
  profileSubmit = (name, email) => {
    mainApi.patchUser(name, email).then((user) => {
      this.setState({ currentUser: { name: user.name, email: user.email}});
    }).cards((err) => {
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
              <Register registrationRequest={this.registrationRequest} />
            </Route>

            <Route exact path="/sign-in">
              <Login loginRequest={this.loginRequest} />
            </Route>

            <ProtectedRoute
              path="/movies"
              loggedIn={this.state.loggedIn}
              component={Movies}
              cards={this.state.cards} />

            <ProtectedRoute
              path="/saved-movies"
              loggedIn={this.state.loggedIn}
              component={SavedMovies}
              cards={this.state.cards} />

            <ProtectedRoute
              path="/profile"
              loggedIn={this.state.loggedIn}
              component={Profile} profileSubmit={this.profileSubmit} />

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