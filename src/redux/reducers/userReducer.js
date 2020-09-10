// Types
import {
  SET_USER, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_USER,
  SET_AUTHENTICATED, SET_UNAUTHENTICATED, MARK_NOTIFICATIONS_READ,
  STOP_LOADING_USER
} from './../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };

    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      }

    case LOADING_USER:
      return {
        ...state,
        loading: true,
      }

    case STOP_LOADING_USER:
      return {
        ...state,
        loading: false,
      }

    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId
          }
        ]
      }

    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(like => like.screamId !== action.payload.screamId)
      }

    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((notification) => (notification.read = true));
      return {
        ...state
      }

    default:
      return state;
  }
}