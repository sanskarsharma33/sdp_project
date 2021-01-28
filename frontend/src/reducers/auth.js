import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
} from '../actions/types';
import {object} from 'prop-types';

const initialState = {
  token: localStorage.getItem ('token'),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  is_vendor: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        is_vendor: action.payload.is_vendor,
        isLoading: false,
        is_vendor: action.payload.is_vendor,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      // console.log(action.payload.values())
      localStorage.setItem ('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        is_vendor: action.payload.user.is_vendor,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem ('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
