import { combineReducers } from 'redux';
import { comments } from './comments';
import { currentUser } from './currentUser';
import { cart } from './cart';
import { product } from './product';
import { blog } from './blog';

export default combineReducers({
  comments,
  currentUser,
  cart,
  product,
  blog,
});
