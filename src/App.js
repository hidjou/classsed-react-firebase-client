// Dependancies
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
// Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';
// Pages
import Home from './pages/Home';
import login from './pages/Login';
import signup from './pages/Signup';
import user from './pages/User';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logOutUser, getUserData } from './redux/actions/userActions';
// MUI stuff
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { global__theme } from './util/theme';


const theme = createMuiTheme(global__theme);

axios.defaults.baseURL = 'https://europe-west6-screams-62f3b.cloudfunctions.net/api';

const token = localStorage.getItem('FBIdToken');
if (token) {
  const decodedToken = jwtDecode(token);
  // console.log(decodedToken); expired after 1 hour
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logOutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}
const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>

        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <AuthRoute exact path='/login' component={login} />
              <AuthRoute exact path='/signup' component={signup} />
              <Route exact path='/users/:handle' component={user} />
              <Route exact path='/users/:handle/scream/:screamId' component={user} />
            </Switch>
          </div>
        </Router>

      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
