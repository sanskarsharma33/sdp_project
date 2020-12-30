import axios from 'axios';
import { returnErrors } from './messages';
import http from '../http-common';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });
    http
    .get('/Authuser/get_user', tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    })
    .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR,
        });
    });
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

    http
    .post('/Authuser/signin', body, config)
    .then((res) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
    })
    .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: LOGIN_FAIL,
        });
    });
};

// REGISTER CUSTOMER
export const registerCustomer = (first_name, last_name, password, email, is_vendor, password2, username, phone ) => (dispatch) => {
    // Headers
    const config = {
        headers: {
        'Content-Type': 'application/json',
        },
    };

    // Request Body
    const body = JSON.stringify({ first_name, last_name, email, password, is_vendor, password2, username, phone });
    console.log(body);
    http
    .post('/Authuser/customer/register', body, config)
    .then((res) => {
      console.log(res);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    http
    .get('/Authuser/logout', tokenConfig(getState))
    .then((res) => {
      dispatch({ type: 'CLEAR_LEADS' });
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};