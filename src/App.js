import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
// Components
import Navbar from './components/Navbar';
// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
