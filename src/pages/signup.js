// dependencies
import React, { useState, useEffect } from 'react'
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
import { signup__theme } from '../util/theme';
// Redux stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = { ...signup__theme };

const Signup = (props) => {

  const { classes, signupUser, UI: { loading } } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [handle, setHandle] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.UI.errors)
      setErrors(props.UI.errors);
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserData = {
      email,
      password,
      confirmPassword,
      handle
    };
    signupUser(newUserData, props.history);
  }

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm >
        <img src={appIcon} alt='Screams Social Ape' className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle} >
          Signup
          </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='email'
            name='email'
            type='email'
            label='Email'
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth />
          <TextField
            id='password'
            name='password'
            type='password'
            label='Password'
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false} value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth />
          <TextField
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            label='Confirm Password'
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false} value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth />
          <TextField
            id='handle'
            name='handle'
            type='text'
            label='handle'
            className={classes.textField}
            helperText={errors.handle}
            error={errors.handle ? true : false} value={handle}
            onChange={(e) => setHandle(e.target.value)}
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
            Sign up
              {loading && (
              <CircularProgress
                className={classes.progress} size={30} />
            )}
          </Button><br />
          <small>Already have an account ? log in <Link to='/login'>here</Link></small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

// PropTypes
Signup.protoTypes = {
  classes: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

// Pull state from Redux Store To Component
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

// Push Actions To Props
const mapActionsToProps = {
  signupUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps)
  (withStyles(styles)(Signup));