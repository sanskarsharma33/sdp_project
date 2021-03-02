import {
    CART_ITEM_ADDED,
    CART_ITEM_ADD_FAIL,
    CART_LOADED,
    CART_LOADING,
    CART_LOAD_FAIL,
    CART_ITEM_DELETED,
    CART_ITEM_DELETION_FAIL,
    ADDRESS_LOADED,
    ADDRESS_LOADING,
    ADDRESS_LOADING_ERROR,
    ADDRESS_DELETE_ERROR,
    ADDRESS_DELETED,
    ADDRESS_DELETING,
    ADDRESS_ADDED,
    ADDRESS_ADDING,
    ADDRESS_ADDING_ERROR,
} from "../actions/types";

const initialState = {
    addressLoaded: false,
    addressList: [],
    addressElementDelete: false,
    addressAdded: false,
    address: null,
    addressSelected: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADDRESS_LOADED:
            return {
                ...state,
                addressLoaded: true,
                addressAdded: false,
                addressList: action.payload,
                addressElementDelete: false,
            };
        case ADDRESS_LOADING_ERROR:
            return {
                ...state,
                addressElementDelete: false,
                addressAdded: false,
                addressLoaded: false,
                addressList: null,
            };
        case ADDRESS_DELETING:
            console.log("DELETING");
            return {
                ...state,
                addressAdded: false,
                addressElementDelete: false,
                addressLoaded: false,
                addressList: [],
            };
        case ADDRESS_DELETED:
            return {
                ...state,
                addressLoaded: true,
                addressElementDelete: true,
                addressList: [],
                addressAdded: false,
            };
        case ADDRESS_ADDED:
            return {
                ...state,
                addressAdded: true,
                addressList: action.payload,
            };
        default:
            return state;
    }
}
