import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import vendor from "./vendor";
import product from "./product";
import productList from "./productList";
import cart from "./cart";

export default combineReducers({
    errors,
    messages,
    auth,
    vendor,
    product,
    productList,
    cart,
});
