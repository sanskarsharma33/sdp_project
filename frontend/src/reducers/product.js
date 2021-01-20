import {
    PRODUCT_LOADING,
    PRODUCT_LOADED,
    PRODUCT_LOADING_FAIL,
    PRODUCT_ADDED, 
    PRODUCT_REMOVED,
    PRODUCT_EDITED,
    PRODUCT_EDIT_FAIL,
    PRODUCT_DELETED,
    PRODUCT_DELETION_FAIL
  } from '../actions/types';

  
const initialState = {
    isProductLoading: false,
    isProductAdded: false,
    isProductLoaded: false,
    product: null,
    isProductUpdated: false,
    isProductDeleted: false,
};
  
export default function (state = initialState, action) {
    switch (action.type) {
        case PRODUCT_LOADING:
            return {
                ...state,
                isProductLoading: true,
            };
        case PRODUCT_LOADED:
            console.log("LOADED");
            return {
                ...state,
                isProductLoaded: true,
                isProductLoading: false,
                product: action.payload,
            };
        case PRODUCT_REMOVED:
        case PRODUCT_LOADING_FAIL:
            return {
                ...state,
                product: null,
                isProductLoaded: false,
                isProductLoading: false,
            };
        case PRODUCT_ADDED:
            return {
                ...state,
                isProductAdded: true,
            };
        case PRODUCT_EDITED:
            return {
                ...state,
                isProductUpdated: true,
            };
        case PRODUCT_EDIT_FAIL:
            return {
                ...state,
                isProductUpdated: false,
            };
        default:
            return state;
    }
}