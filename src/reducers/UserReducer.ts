import {
    LOG_IN,
    LOG_OUT,
    RESERVE_SLOT,
    DELETE_EVENT,
    REQUEST_ADD_USER,
    REQUEST_ADD_USER_SUCESS,
    REQUEST_ADD_USER_FAILED,
    REQUEST_LOGIN_USER,
} from "../actions/ActionTypes";
// eslint-disable-next-line no-unused-vars
import { User } from "../types/User";
// eslint-disable-next-line no-unused-vars
import { initialState, UserState } from "./initialState";

const setupUser = (
    userState: UserState = initialState.userState,
    // eslint-disable-next-line comma-dangle
    action: any = {}
) => {
    switch (action.type) {
        case REQUEST_ADD_USER:
        case REQUEST_LOGIN_USER:
            return { ...userState, isRequestPending: true };
        case REQUEST_ADD_USER_SUCESS:
        case REQUEST_ADD_USER_FAILED:
            return { ...userState, isRequestPending: false };
        case LOG_IN:
            return {
                ...userState,
                isUserLogged: true,
                loggedInUser: action.payload,
            };
        case LOG_OUT:
            return Object.assign({}, userState, {
                isUserLogged: false,
                loggedInUser: undefined,
            });
        case RESERVE_SLOT: {
            const { eventId } = action.payload;
            if (userState.loggedInUser) {
                const loggedInUser = {
                    ...userState.loggedInUser,
                    events: [...userState.loggedInUser.events, eventId],
                };
                return {
                    ...userState,
                    loggedInUser: loggedInUser,
                };
            }
            return userState;
        }
        case DELETE_EVENT:
            const newUsers = userState.users.map((user: User) => {
                const newEvents = user.events.filter((id: number) => {
                    return id !== action.payload;
                });
                return { ...user, events: newEvents };
            });
            return { ...userState, users: newUsers };
        default:
            return userState;
    }
};

export default setupUser;
