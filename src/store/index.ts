import { createStore, combineReducers, applyMiddleware } from "redux";
import setupUser from "../reducers/UserReducer";
import gameEvents from "../reducers/GameEventReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({ userState: setupUser, events: gameEvents });
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
