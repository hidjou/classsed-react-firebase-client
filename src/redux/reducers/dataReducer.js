// Types
import {
  SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM,
  LOADING_DATA, DELETE_SCREAM, POST_SCREAM,
  SET_SCREAM, SUBMIT_COMMENT, LOADING_COMMENT_UI
} from './../types';


const initialState = {
  screams: [],
  scream: {},
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }

    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      }

    case LOADING_COMMENT_UI:
      return {
        ...state,
        loading: false
      };

    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId);
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = { ...state.scream, ...action.payload };
      }
      return {
        ...state
      }

    case DELETE_SCREAM:
      let i = state.screams.findIndex(scream => scream.screamId === action.payload);
      state.screams.splice(i, 1);
      return {
        ...state
      }

    case POST_SCREAM:
      return {
        ...state,
        screams: [
          action.payload,
          ...state.screams
        ]
      }

    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      }

    case SUBMIT_COMMENT:
      let newCommentIndex = state.screams.findIndex(scream => scream.screamId === action.payload.screamId);
      return {
        ...state,
        screams: state.screams.map((scream, screamArrIndex) => (
          screamArrIndex === newCommentIndex ? (
            { ...scream, commentCount: scream.commentCount + 1 }
          ) : scream
        )),
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
          commentCount: state.scream.commentCount + 1
        }
      };

    default:
      return state;
  }
}








