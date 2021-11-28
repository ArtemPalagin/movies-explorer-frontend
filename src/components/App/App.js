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


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [{
        image: "https://oir.mobi/uploads/posts/2021-05/1622262892_61-oir_mobi-p-krasivie-vidi-prirodi-priroda-krasivo-foto-65.jpg",
        text: "какая-то гора 1",
        like: true,
        time: "1ч42м",
      }, {
        image: "https://oir.mobi/uploads/posts/2021-05/1622262892_61-oir_mobi-p-krasivie-vidi-prirodi-priroda-krasivo-foto-65.jpg",
        text: "какая-то гора 2",
        like: true,
        time: "1ч42м",
      }, {
        image: "https://oir.mobi/uploads/posts/2021-05/1622262892_61-oir_mobi-p-krasivie-vidi-prirodi-priroda-krasivo-foto-65.jpg",
        text: "какая-то гора 3",
        like: true,
        time: "1ч42м",
      }, {
        image: "https://oir.mobi/uploads/posts/2021-05/1622262892_61-oir_mobi-p-krasivie-vidi-prirodi-priroda-krasivo-foto-65.jpg",
        text: "какая-то гора 4",
        like: true,
        time: "1ч42м",
      }, {
        image: "https://oir.mobi/uploads/posts/2021-05/1622262892_61-oir_mobi-p-krasivie-vidi-prirodi-priroda-krasivo-foto-65.jpg",
        text: "какая-то гора 5",
        like: true,
        time: "1ч42м",
      }, {
        image: "https://oir.mobi/uploads/posts/2021-05/1622262892_61-oir_mobi-p-krasivie-vidi-prirodi-priroda-krasivo-foto-65.jpg",
        text: "какая-то гора 6",
        like: true,
        time: "1ч42м",
      }],
      loggedIn: true,
    };
  }
  render() {
    return (
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
            <Register />
          </Route>

          <Route exact path="/sign-in">
            <Login />
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
            component={Profile} />

          <Route path="/">
            <Error />
          </Route>

        </Switch>

        <Switch>

          <Route exact path={["/", "/movies", "/saved-movies", "/profile"]}>
            <Footer />
          </Route>

        </Switch>

      </div>
    )
  }
}

export default withRouter(App);