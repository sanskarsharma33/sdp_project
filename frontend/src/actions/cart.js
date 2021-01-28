import { tokenConfig } from "./auth";
import http from "../http-common";
import {
  CART_LOADED,
  CART_ITEM_ADDED,
  CART_ITEM_ADD_FAIL,
  CART_LOADING,
  CART_LOAD_FAIL,
  CART_ITEM_DELETED,
  CART_ITEM_DELETION_FAIL,
} from "./types";
import cart from "../reducers/cart";

export const addToCart = (data) => (dispatch, getState) => {
  //dispatch({ CART_ITEM_ADDING });
  const body = JSON.stringify(data);
  http
    .post("ManageOrders/cart/", body, tokenConfig(getState))
    .then((res) => {
      console.log(res);
      dispatch({
        type: CART_ITEM_ADDED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: CART_ITEM_ADD_FAIL,
      });
    });
};

export const getCartItems = () => (dispatch, getState) => {
  console.log("a");
  dispatch({ type: CART_LOADING });
  http
    .get("ManageOrders/cart/", tokenConfig(getState))
    .then((res) => {
      //console.log(res.data);
      dispatch({
        type: CART_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: CART_LOAD_FAIL,
      });
    });
};

export const deleteCartItem = (id) => (dispatch, getState) => {
  dispatch({ type: CART_LOADING });

  // Request Body
  const body = JSON.stringify(id);

  console.log(body);
  http
    .delete(`/ManageOrders/cart/${id}/`, tokenConfig(getState))
    .then((res) => {
      // console.log("PP")
      dispatch({
        type: CART_ITEM_DELETED,
        payload: id,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      // console.log(err)
      dispatch({
        type: CART_ITEM_DELETION_FAIL,
      });
    });
};

