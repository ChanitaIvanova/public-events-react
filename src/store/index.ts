import { createStore, combineReducers } from "redux";
import setupUser from "../reducers/UserReducer";
import gameEvents from "../reducers/GameEventReducer";
import { loadState, saveState } from "./LocalStorage";

const reducer = combineReducers({ userState: setupUser, events: gameEvents });
const persistedState = loadState();
const store = createStore(reducer, persistedState);
store.subscribe(() => {
    saveState(store.getState());
});

export default store;
