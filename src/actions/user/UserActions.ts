import {
    LOG_IN,
    LOG_OUT,
    RESERVE_SLOT,
    REQUEST_ADD_USER,
    REQUEST_ADD_USER_SUCESS,
    REQUEST_ADD_USER_FAILED,
    REQUEST_LOGIN_USER,
    FREE_SLOT,
} from "../ActionTypes";
// eslint-disable-next-line no-unused-vars
import { User } from "../../types/User";

export const requestAddUser = () => {
    return { type: REQUEST_ADD_USER };
};

export const requestAddUserSucess = () => {
    return { type: REQUEST_ADD_USER_SUCESS };
};

export const requestAddUserFailed = () => {
    return { type: REQUEST_ADD_USER_FAILED };
};

export const requestLogInUser = () => {
    return { type: REQUEST_LOGIN_USER };
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
