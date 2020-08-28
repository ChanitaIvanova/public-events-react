import { REQUEST_LOGIN_USER, REQUEST_ADD_USER } from "../actions/ActionTypes";
import { getUser, loginUser, addUser } from "../services/users.service";
// eslint-disable-next-line no-unused-vars
import { User } from "../types/User";
import { take, put, call } from "redux-saga/effects";
import {
    logIn,
    requestAddUserFailed,
    requestAddUserSucess,
} from "../actions/user/UserActions";

/**
 * Retrives the user data from the backend and saves it in the state
 */
export function* getUserGen() {
    const user = yield call(getUser);
    if (user) {
        yield put(logIn(user));
    }
}

/**
 * Check if the user exists and if so svae to state
 */
export function* loginUserGen() {
    const { email, password } = yield take(REQUEST_LOGIN_USER);

    const user = yield call(() => {
        return loginUser(email, password);
    });
    if (user) {
        yield put(requestAddUserSucess());
        yield put(logIn(user));
    } else {
        yield put(requestAddUserFailed());
    }
}

/**
 * Adds the user in backend
 */
export function* addUserGen() {
    const { user } = yield take(REQUEST_ADD_USER);

    const isAdded = yield call(() => {
        return addUser(user);
    });
    if (isAdded) {
        yield put(requestAddUserSucess());
    } else {
        yield put(requestAddUserFailed());
    }
}
