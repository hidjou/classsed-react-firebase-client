// dependencies
import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
// Redux
import { connect } from 'react-redux';
// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import { scream__theme } from './../../util/theme';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';

const styles = { ...scream__theme };

const Scream = (props) => {

  const {
    classes,
    scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount },
    user: { authenticated, credentials: { handle } },
    openDialog
  } = props;

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;

  dayjs.extend(relativeTime);

  return (
    <Card className={classes.card} >
      <CardMedia image={userImage} title='Profile Image' className={classes.image} />
      <CardContent className={classes.content}>
        <Typography variant='h5' color="primary" component={Link} to={`users/${userHandle}`}>{userHandle}</Typography>
        <Typography variant='body2' color='textSecondary'><small color='textSecondary'>{`@${userHandle}`}</small></Typography>
        {deleteButton}
        <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
        <Typography variant='body1'>{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} Likes</span>
        <MyButton tip='comments'>
          <ChatIcon color='primary' />
        </MyButton>
        <span>{commentCount} comments</span>
        <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={openDialog} />
      </CardContent>
    </Card>
  )
}

// PropTypes
Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
}

// Pull state from Redux Store To Component
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

export default connect(mapStateToProps)(withStyles(styles)(Scream));