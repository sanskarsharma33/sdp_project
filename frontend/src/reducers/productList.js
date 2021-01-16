import {
    PRODUCT_LIST_LOADED,
    PRODUCT_LIST_LOADING,
    PRODUCT_LIST_LOADING_FAIL
  } from '../actions/types';

  
const initialState = {
    isProductListLoading: false,
    isProductListLoaded: false,
    productList: null,
};
  
export default function (state = initialState, action) {
    switch (action.type) {
        case PRODUCT_LIST_LOADING:
            return {
                ...state,
                isProductListLoading: true,
            };
        case PRODUCT_LIST_LOADED:
            return {
                ...state,
                isProductListLoaded: true,
                isProductListLoading: false,
                productList: action.payload,
            };
        case PRODUCT_LIST_LOADING_FAIL:
            return {
                ...state,
                productList: null,
                isProductListLoaded: false,
                isProductListLoading: false,
            };
        default:
            return state;
    }
}