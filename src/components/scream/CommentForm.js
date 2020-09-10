// Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
// MUI Stuff
import { global__theme, login__theme } from './../../util/theme';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux stuff
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const styles = { ...login__theme };

const CommentForm = props => {

  const { classes, authenticated, submitComment, screamId, data: { loading } } = props;
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});


  useEffect(() => {

    if (props.UI.errors) {
      setErrors(props.UI.errors);
    }
    if (!props.UI.errors && !props.UI.loading) {
      setErrors('');
    }
  }, [props]);

  const handleChange = (e) => setBody(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitComment(screamId, { body: body });
    setErrors('');
    setBody('');
  };

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={loading}
        >
          Submit
          {loading && (
              <CircularProgress
                className={classes.button} size={10} />
            )}
          </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : (<Typography align='center' color='secondary'>
    <Link to='/login'>Log in </Link>
      or <Link to='/signup'>Sign up </Link> and join the conversation</Typography>);
  return commentFormMarkup;
}

// PropTypes  
CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

// Pull state from Redux Store To Component
const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
  data: state.data
});

// Push Actions To Props
const mapActionsToProps = {
  submitComment
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(CommentForm));