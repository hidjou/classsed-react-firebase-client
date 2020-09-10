import {
  validateSignUpData,
  validateLogInData,
  validateProfielImage,
  validateUserDetails
} from './../util/validators';
import axios from 'axios';
import {
  SET_USER, SET_ERRORS, CLEAR_ERRORS,
  LOADING_USER, LOADING_UI, SET_UNAUTHENTICATED,
  MARK_NOTIFICATIONS_READ, STOP_LOADING_USER
} from './../types';

// helper functions
// Handle auth headers
const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
}

// Clear all errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// get user details actions
export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/user')
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
}

// user actions triggers

// login action
export const loginUser = (userData, history) => (dispatch) => {
  dispatch(clearErrors());
  dispatch({ type: LOADING_UI });
  const { errors, valid } = validateLogInData(userData);
  (valid) ? (
    axios
      .post('/login', userData)
      .then(res => {
        console.log(res.data);
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        })
      })
  ) : (
      dispatch({
        type: SET_ERRORS,
        payload: errors
      })
    )
}

// signup action
export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch(clearErrors());
  dispatch({ type: LOADING_UI });
  const { errors, valid } = validateSignUpData(newUserData);
  (valid) ? (
    axios
      .post('/signup', newUserData)
      .then(res => {
        console.log(res.data);
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        })
      })
  ) : (
      dispatch({
        type: SET_ERRORS,
        payload: errors
      })
    )
}

// logout action
export const logOutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization']
  dispatch({ type: SET_UNAUTHENTICATED });
}

export const uploadImage = (formData) => (dispatch) => {
  const { valid, errors } = validateProfielImage(formData);

  dispatch(clearErrors());
  dispatch({ type: LOADING_USER });
  if (valid) {
    axios
      .post('/user/image', formData)
      .then(() => {
        dispatch(getUserData());
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: STOP_LOADING_USER });
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  } else {
    dispatch({ type: STOP_LOADING_USER });
    dispatch({
      type: SET_ERRORS,
      payload: errors
    });
  }
}

// edit user details in profile page
export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch(clearErrors());

  const { errors, valid } = validateUserDetails(userDetails);

  if (valid) {

    axios
      .post('/user', userDetails)
      .then(() => {
        dispatch(getUserData());
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        })
      })
  } else {
    console.log(userDetails);
    dispatch({ type: STOP_LOADING_USER });
    dispatch({
      type: SET_ERRORS,
      payload: errors
    })
  }
}

// show all user notifications

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post('/notifications', notificationIds)
    .then(res => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      });
    })
    .catch(err => console.log(err));
}