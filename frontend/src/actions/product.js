import { returnErrors } from './messages';
import http from '../http-common';

import {
  PRODUCT_LOADED,
  PRODUCT_LOADING,
  PRODUCT_LOADING_FAIL,
  PRODUCT_ADDED,
  PRODUCT_ADDING_FAIL,
  PRODUCT_ADDING,
  PRODUCT_EDITED,
  PRODUCT_EDIT_FAIL,
  PRODUCT_DELETED,
  PRODUCT_DELETION_FAIL
} from './types';

export const add_Product = (Product) => (dispatch, getState) => {
    // Product List Loading
    dispatch({ type: PRODUCT_ADDING });

    // Request Body
    const body = JSON.stringify(Product);

    console.log(body)
    
    http
    .post('/ManageShops/products/', body, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: PRODUCT_ADDED,
            payload: res.data,
        });
    })
    .catch((err) => {
        // dispatch(returnErrors(err.response.data, err.response.status));
        // console.log(err)
        dispatch({
            type: PRODUCT_ADDING_FAIL,
        });
    });
};

export const edit_Product = (Product) => (dispatch, getState) => {
  // Product List Loading
  dispatch({ type: PRODUCT_ADDING });

  // Request Body
  const body = JSON.stringify(Product);

  console.log(body)
  
  http
  .put(`/ManageShops/products/${Product.id}/`, body, tokenConfig(getState))
  .then((res) => {
      dispatch({
          type: PRODUCT_EDITED,
          payload: res.data,
      });
  })
  .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      // console.log(err)
      dispatch({
          type: PRODUCT_EDIT_FAIL,
      });
  });
};

export const getProduct = (id) => (dispatch, getState) => {
  // Product List Loading
  dispatch({ type: PRODUCT_LOADING });

  // Request Body
  const body = JSON.stringify(id);

  console.log(body)
  http
  .get(`/ManageShops/product/${id}`, tokenConfig(getState))
  .then((res) => {
      // console.log("PP")
      dispatch({
          type: PRODUCT_LOADED,
          payload: res.data,
      });
  })
  .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      // console.log(err)
      dispatch({
          type: PRODUCT_LOADING_FAIL,
      });
  });
};

export const delete_Product = (id) => (dispatch, getState) => {
    // Product List Loading
    dispatch({ type: PRODUCT_LOADING });
  
    // Request Body
    const body = JSON.stringify(id);
  
    console.log(body)
    http
    .delete(`/ManageShops/products/${id}/`, tokenConfig(getState))
    .then((res) => {
        // console.log("PP")
        dispatch({
            type: PRODUCT_DELETED,
            payload: id
        });
    })
    .catch((err) => {
        // dispatch(returnErrors(err.response.data, err.response.status));
        // console.log(err)
        dispatch({
            type: PRODUCT_DELETION_FAIL,
        });
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