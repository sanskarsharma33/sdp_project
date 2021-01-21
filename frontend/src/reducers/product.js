import {
    PRODUCT_LOADING,
    PRODUCT_LOADED,
    PRODUCT_LOADING_FAIL,
    PRODUCT_ADDED, 
    PRODUCT_REMOVED,
    PRODUCT_EDITED,
    PRODUCT_EDIT_FAIL,
    PRODUCT_DELETED,
    PRODUCT_DELETION_FAIL,
    PRODUCT_IMAGES_UPLOADED,
    PRODUCT_IMAGES_UPLOAD_FAIL
  } from '../actions/types';

  
const initialState = {
    isProductLoading: false,
    isProductAdded: false,
    isProductLoaded: false,
    product: null,
    isProductUpdated: false,
    isProductDeleted: false,
    areProductImagesUploaded: false,
};
  
export default function (state = initialState, action) {
    switch (action.type) {
        case PRODUCT_LOADING:
            return {
                ...state,
                isProductLoading: true,
                areProductImagesUploaded: false,
            };
        case PRODUCT_LOADED:
            console.log("LOADED");
            return {
                ...state,
                isProductLoaded: true,
                isProductLoading: false,
                product: action.payload,
                areProductImagesUploaded: false,
            };
        case PRODUCT_REMOVED:
        case PRODUCT_LOADING_FAIL:
            return {
                ...state,
                product: null,
                isProductLoaded: false,
                isProductLoading: false,
                areProductImagesUploaded: false,
            };
        case PRODUCT_ADDED:
            return {
                ...state,
                areProductImagesUploaded: false,
                isProductAdded: true,
            };
        case PRODUCT_EDITED:
            return {
                ...state,
                areProductImagesUploaded: false,
                isProductUpdated: true,
            };
        case PRODUCT_EDIT_FAIL:
            return {
                ...state,
                areProductImagesUploaded: false,
                isProductUpdated: false,
            };
        case PRODUCT_IMAGES_UPLOADED:
            return {
                ...state,
                areProductImagesUploaded: true,
            }
        default:
            return state;
    }
}