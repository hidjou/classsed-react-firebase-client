// Dependancies
import React from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { likeScream, unLikeScream } from '../../redux/actions/dataActions';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const LikeButton = (props) => {

  const { user: { likes, authenticated }, likeScream, unLikeScream, screamId } = props;

  const likedScream = () => {
    if (likes && likes.find(like => like.screamId === screamId))
      return true;
    else return false;
  };

  const handleLikeScream = () => likeScream(screamId);

  const handleUnLikeScream = () => unLikeScream(screamId);

  const likeButton = !authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={handleUnLikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
        <MyButton tip="Like" onClick={handleLikeScream}>
          <FavoriteBorder color="primary" />
        </MyButton>
      );
  return likeButton;
}

// PropTypes
LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unLikeScream: PropTypes.func.isRequired
};

// Pull state from Redux Store To Component
const mapStateToProps = (state) => ({
  user: state.user
});

// Push Actions To Props
const mapActionsToProps = {
  likeScream,
  unLikeScream
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);