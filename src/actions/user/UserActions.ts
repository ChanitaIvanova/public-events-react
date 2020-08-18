import { SIGN_IN, LOG_IN, LOG_OUT, RESERVE_SLOT } from "../ActionTypes";
// eslint-disable-next-line no-unused-vars
import { User } from "../../types/User";

export const signIn = (user: User) => {
    return { type: SIGN_IN, payload: user };
};

export const logIn = (id: number) => {
    return { type: LOG_IN, payload: id };
};

export const logOut = () => {
    return { type: LOG_OUT };
};

export const reserveSlotForUser = (eventId: Number, userId: Number) => {
    return { type: RESERVE_SLOT, payload: { eventId, userId } };
};
