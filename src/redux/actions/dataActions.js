// validation 
import {
  validateCommentData,
  validateScreamData
} from './../util/validators';
// types
import {
  SET_SCREAMS, LOADING_DATA, LIKE_SCREAM,
  UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM,
  CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI,
  SET_SCREAM, SUBMIT_COMMENT, SET_ERRORS,
  LOADING_COMMENT_UI
} from './../types';
import axios from 'axios';

// clear all errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// get all screams
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/screams')
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: []
      });
    });
};

// like scream
export const likeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      })
    })
    .catch((err) => console.log(err));
};

// unlike scream
export const unLikeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data
      })
    })
    .catch((err) => console.log(err));
};

// delete scream
export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`/scream/${screamId}`)
    .then(res => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId
      })
    })
    .catch((err) => console.log(err));
};

// psot a scream
export const postScream = (newScream) => (dispatch) => {
  const { valid, errors } = validateScreamData(newScream);
  dispatch({ type: LOADING_UI });

  if (valid) {
    axios
    .post('/scream', newScream)
    .then(res => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
  } else {
    dispatch({
      type: SET_ERRORS,
      payload: errors
    })
  }

}

// get scream details
export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// comment on scream
export const submitComment = (screamId, commentData) => (dispatch) => {
  const { errors, valid } = validateCommentData(commentData);

  dispatch(clearErrors());

  if (!valid) {
    dispatch({ type: LOADING_COMMENT_UI });
    dispatch({
      type: SET_ERRORS,
      payload: errors
    });
  } else {
    axios
      .post(`/scream/${screamId}/comment`, commentData)
      .then((res) => {
        dispatch({
          type: SUBMIT_COMMENT,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  }

};

// get all data about on user
export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.screams
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: null
      });
    });
};