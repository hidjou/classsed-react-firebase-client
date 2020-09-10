// Types
import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI, LOADING_COMMENT_UI } from './../types';

const initialState = {
  loading: false,
  errors: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case LOADING_UI:
      return {
        ...state,
        loading: SVGComponentTransferFunctionElement
      };

    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      }

    default:
      return state;
  }
}