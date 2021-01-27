import {
  CART_ITEM_ADDED,
  CART_ITEM_ADD_FAIL,
  CART_LOADED,
  CART_LOADING,
  CART_LOAD_FAIL,
  CART_ITEM_DELETED,
  CART_ITEM_DELETION_FAIL,
  CART_ITEM_MODIFIED,
  CART_ITEM_MODIFY_FAIL,
} from "../actions/types";

const initialState = {
  isItemAdded: false,
  isCartLoading: false,
  cartItems: null,
  cartItemDeleted: false,
  cartUpdated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CART_ITEM_ADDED:
      return {
        ...state,
        cartUpdated: true,
      };
    case CART_ITEM_ADD_FAIL:
      return {
        ...state,
        isItemAdded: false,
      };
    case CART_LOADING:
      return {
        ...state,
        isCartLoading: true,
        cartUpdated: false,
      };
    case CART_LOADED:
      return {
        ...state,
        cartItems: action.payload,
        isCartLoading: false,
        cartItemDeleted: false,
      };
    case CART_LOAD_FAIL:
    case CART_ITEM_DELETION_FAIL:
    case CART_ITEM_MODIFY_FAIL:
      return {
        ...state,
        cartItems: null,
        isCartLoading: false,
      };
    case CART_ITEM_DELETED:
    case CART_ITEM_MODIFIED:
      return {
        ...state,
        cartItems: null,
        cartUpdated: true,
        isCartLoading: false,
      };

    default:
      return state;
  }
}
