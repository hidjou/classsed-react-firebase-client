// Dependancies
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MyButton from '../../util/MyButton';
import PostScream from './../scream/PostScream';
import Notifications from './Notifications';
// Redux
import { connect } from 'react-redux';
// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// Icons
import HomeIcon from '@material-ui/icons/Home';

const Navbar = ({ authenticated }) => {

  return (
    <AppBar>
      <Toolbar className='nav-container'>
        {(authenticated) ? (
          <Fragment>
            <PostScream />
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
            <Notifications />
          </Fragment>
        ) : (
            <Fragment>
              <Button color='inherit' component={Link} to='/login'>Login</Button>
              <Button color='inherit' component={Link} to='/'>Home</Button>
              <Button color='inherit' component={Link} to='/signup'>Signup</Button>
            </Fragment>
          )
        }
      </Toolbar>
    </AppBar >
  )
}

// PropTypes
Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

// Pull state from Redux To Component
const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);