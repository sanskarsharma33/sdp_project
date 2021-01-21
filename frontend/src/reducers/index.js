import { combineReducers } from 'redux';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import product from './product';
import productList from './productList';

export default combineReducers({
  errors,
  messages,
  auth,
  product,
  productList,
});