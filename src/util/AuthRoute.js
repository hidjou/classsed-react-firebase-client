import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => authenticated === true ? <Redirect to='/' /> : <Component {...props} />}
  />
)

// PropTypes  
AuthRoute.propTypes = {
  user: PropTypes.object
};

// Pull state from Redux Store To Component
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(AuthRoute);