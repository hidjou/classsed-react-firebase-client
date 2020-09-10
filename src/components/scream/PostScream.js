// Dependancies
import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
// Redux stuff
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../redux/actions/dataActions';
// MUI stuff
import { global__theme, post__scream__theme } from './../../util/theme';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
  ...global__theme,
  ...post__scream__theme
};

const PostScream = (props) => {

  const { classes, postScream, clearErrors, UI: { loading } } = props;

  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors);
    }
    if (!props.UI.errors && !props.UI.loading) {
      setBody('');
      setOpen(false);
      setErrors({});
    }
  }, [props.UI]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    clearErrors();
    setOpen(false);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postScream({ body });
  };

  return (
    <Fragment>
      <MyButton onClick={handleOpen} tip="Post a Scream!">
        <AddIcon />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!!!"
              multiline
              rows="3"
              placeholder="Scream at your fellow apes"
              error={errors.body || errors.scream ? true : false}
              helperText={errors.scream || errors.body}
              className={classes.textField}
              onChange={(e) => setBody(e.target.value)}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
                {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

// PropTypes
PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

// Pull state from Redux Store To Component
const mapStateToProps = (state) => ({
  UI: state.UI
});

// Push Actions To Props
const mapActionsToProps = {
  postScream,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostScream));