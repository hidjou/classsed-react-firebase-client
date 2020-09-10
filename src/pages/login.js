// dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import appIcon from './../images/icon.png';
// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { login__theme } from '../util/theme';
// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = { ...login__theme };

const Login = (props) => {

  const { classes, loginUser, UI: { loading } } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.UI.errors)
      setErrors(props.UI.errors);
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    loginUser(userData, props.history);
  }

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm >
        <img src={appIcon} alt='Screams Social Ape' className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle} >
          Login
          </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='email'
            name='email'
            type='email'
            label='Email'
            className={classes.textField}
            helperText={errors.loginEmail}
            error={errors.loginEmail ? true : false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth />
          <TextField
            id='password'
            name='password'
            type='password'
            label='Password'
            className={classes.textField}
            helperText={errors.loginPassword}
            error={errors.loginPassword ? true : false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth />

          {errors.general && (
            <Typography
              variant='body2' className={classes.customeError}
            >
              {errors.general}
            </Typography>
          )}

          <Button
            variant='contained'
            type='submit'
            color='primary'
            className={classes.button}
            disabled={loading}
          >
            Login
              {loading && (
              <CircularProgress
                className={classes.progress} size={30} />
            )}
          </Button><br />
          <small>Don't have an account ? sign up <Link to='/signup'>here</Link></small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

// PropTypes
Login.protoTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

// Pull state from Redux Store To Component
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

// Push Actions To Props
const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps)
  (withStyles(styles)(Login));