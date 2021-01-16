import {
    PRODUCT_LOADING,
    PRODUCT_LOADED,
    PRODUCT_LOADING_FAIL
  } from '../actions/types';

  
const initialState = {
    isProductLoading: false,
    isProductLoaded: false,
    product: null,
};
  
export default function (state = initialState, action) {
    switch (action.type) {
        case PRODUCT_LOADING:
            return {
                ...state,
                isProductLoading: true,
            };
        case PRODUCT_LOADED:
            return {
                ...state,
                isProductLoaded: true,
                isProductLoading: false,
                product: action.payload,
            };
        case PRODUCT_LOADING_FAIL:
            return {
                ...state,
                product: null,
                isProductLoaded: false,
                isProductLoading: false,
            };
        default:
            return state;
    }
}