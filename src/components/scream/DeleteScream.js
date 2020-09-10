// Dependancies
import React, { Fragment, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
// MUI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
// Redux
import { connect } from 'react-redux';
import { deleteScream } from '../../redux/actions/dataActions';

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
};

const DeleteScream = ({ classes, screamId, deleteScream }) => {

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    deleteScream(screamId);
    setOpen(false);
  };

  return (
    <Fragment>
      <MyButton
        tip="Delete Scream"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Are you sure you want to delete this scream ?
          </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
            </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

// PropTypes
DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

// Push Actions To Props
const mapActionsToProps = {
  deleteScream
};

export default connect(
  null,
  mapActionsToProps
)(withStyles(styles)(DeleteScream));