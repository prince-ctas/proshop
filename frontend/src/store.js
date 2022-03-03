import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducers,
  productDetailsReducers,
  productDeleteReducers,
  productCreateReducers,
  productUpdateReducers,
} from "./reducers/ProductReducers";
import { cartReducer } from "./reducers/CartReducer";
import {
  userLoginReducers,
  userRegisterReducers,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/UserReducer";
import {
  orderCreateReducers,
  orderDetailsReducers,
  orderPayReducers,
  orderListMyReducers,
} from "./reducers/OrderReducer";
const reducer = combineReducers({
  productlist: productListReducers,
  productdetails: productDetailsReducers,
  productDelete: productDeleteReducers,
  productCreate: productCreateReducers,
  productUpdate: productUpdateReducers,
  cart: cartReducer,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducers,
  orderDetails: orderDetailsReducers,
  orderPay: orderPayReducers,
  orderMyList: orderListMyReducers,
});

const cartItemFromStorage = localStorage.getItem("cartItem")
  ? JSON.parse(localStorage.getItem("cartItem"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialstate = {
  cart: {
    cartItems: cartItemFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
