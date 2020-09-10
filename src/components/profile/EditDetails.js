// Dependancies
import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
// Redux
import { connect } from 'react-redux';
import { editUserDetails } from './../../redux/actions/userActions';
// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import { global__theme } from './../../util/theme';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = {
  ...global__theme,
  button: {
    float: 'right'
  }
};

const EditDetails = (props) => {

  const { classes, editUserDetails, credentials, UI } = props;

  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const mapUserDetailsToState = (cred) => {
    setBio(cred.bio ? cred.bio : '');
    setWebsite(cred.website ? cred.website : '');
    setLocation(cred.location ? cred.location : '');
  };

  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(credentials);
  };

  const handleClose = () => {
    if (!errors) {
      setOpen(false);
      // mapUserDetailsToState(credentials);
    }
  };

  const handleSubmit = () => {
    const userDetails = { bio, website, location };
    editUserDetails(userDetails);
    handleClose();
  };

  useEffect(() => {

    if (props.UI.errors) {
      setErrors(props.UI.errors);
    }
    if (!props.UI.errors && !props.UI.loading) {
      setErrors('');
    }
  }, [props]);

  return (
    <Fragment>
      <MyButton
        tip="Edit Details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              tpye="text"
              label="Bio"
              helperText={errors.bio}
              error={errors.bio ? true : false}
              multiline
              rows="1"
              placeholder="A short bio about yourself, at least 10 characters long"
              className={classes.textField}
              value={bio}
              onChange={e => setBio(e.target.value)}
              fullWidth
            />
            <TextField
              name="website"
              tpye="text"
              label="Website"
              helperText={errors.website}
              error={errors.website ? true : false}
              placeholder="Your personal/professinal website, begins with http/https"
              className={classes.textField}
              value={website}
              onChange={e => setWebsite(e.target.value)}
              fullWidth
            />
            <TextField
              name="location"
              tpye="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={location}
              onChange={e => setLocation(e.target.value)}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
            </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

// PropTypes
EditDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

// Pull state from Redux Store To Component
const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  UI: state.UI
});

// Push Actions To Props
const mapActionsToProps = {
  editUserDetails
};

export default connect(
  mapStateToProps,
  mapActionsToProps)
  (withStyles(styles)(EditDetails));