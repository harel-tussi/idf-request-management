import { createStore, applyMiddleware } from "redux";
import authReducer from "../reducers/authReducer";
import thunk from "redux-thunk";
export default createStore(authReducer, applyMiddleware(thunk));
