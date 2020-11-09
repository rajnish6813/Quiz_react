import {applyMiddleware, combineReducers, createStore} from "redux";
import UserReducer from "./reducers/UserReducers";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  userReducer: UserReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

//const store = createStore(null, null)

export default store;