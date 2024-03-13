import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { LoginReducer } from "../reducers/LoginReducer";
import { CustomerReducer } from "../reducers/CustomerReducer";

const reducer = combineReducers({
  Loginstore: LoginReducer,
  CustomerStore: CustomerReducer,
});

const initialState = {};
const middleWare = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
