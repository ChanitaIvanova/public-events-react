import { createStore, combineReducers, applyMiddleware } from "redux";
import setupUser from "../reducers/UserReducer";
import gameEvents from "../reducers/GameEventReducer";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { initSagas } from "./initSagas";

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({ userState: setupUser, events: gameEvents });
const store = createStore(reducer, applyMiddleware(sagaMiddleware, thunk));
initSagas(sagaMiddleware);
export default store;
