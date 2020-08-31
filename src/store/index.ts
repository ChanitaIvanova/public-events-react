import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import setupUser from "../reducers/UserReducer";
import gameEvents from "../reducers/GameEventReducer";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { initSagas } from "./initSagas";
import { reducer as formReducer } from "redux-form";
const composeEnhancers =
    (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]({
        trace: true,
        traceLimit: 100,
    }) as typeof compose) || compose;
const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
    userState: setupUser,
    eventsState: gameEvents,
    form: formReducer,
});
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware, thunk))
);
initSagas(sagaMiddleware);
export default store;
