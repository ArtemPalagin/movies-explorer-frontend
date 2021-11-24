import React from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Main from '../Main/Main.js';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }
  render() {
    return(
      <div className="page">
        <Main />
      </div>
    )
  }
}

export default App;
