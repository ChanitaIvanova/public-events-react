import {
    LOG_IN,
    LOG_OUT,
    RESERVE_SLOT,
    REQUEST_ADD_USER,
    REQUEST_ADD_USER_SUCESS,
    REQUEST_ADD_USER_FAILED,
    REQUEST_LOGIN_USER,
    FREE_SLOT,
    REQUEST_USER_DATA,
    USER_DATA_RETRIEVED,
} from "../ActionTypes";
// eslint-disable-next-line no-unused-vars
import { User } from "../../types/User";

export const requestAddUser = (user: User) => {
    return { type: REQUEST_ADD_USER, user };
};

export const requestAddUserSucess = () => {
    return { type: REQUEST_ADD_USER_SUCESS };
};

export const requestAddUserFailed = () => {
    return { type: REQUEST_ADD_USER_FAILED };
};

export const requestLogInUser = (email: string, password: string) => {
    return { type: REQUEST_LOGIN_USER, email, password };
};

export const requestUserData = () => {
    return { type: REQUEST_USER_DATA };
};

export const userDataRetrieved = () => {
    return { type: USER_DATA_RETRIEVED };
};

export const logIn = (user: User) => {
    return { type: LOG_IN, payload: user };
};

export const logOut = () => {
    return { type: LOG_OUT };
};

export const reserveSlotForUser = (eventId: Number) => {
    return { type: RESERVE_SLOT, payload: { eventId } };
};

export const freeSlotForUser = (eventId: Number) => {
    return { type: FREE_SLOT, payload: { eventId } };
};
