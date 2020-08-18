import {
    SIGN_IN,
    LOG_IN,
    LOG_OUT,
    RESERVE_SLOT,
    DELETE_EVENT,
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
        case SIGN_IN:
            const countUsers = userState.users.length;
            const user: User = action.payload;
            user.id = countUsers;
            const users: User[] = [...userState.users];
            users.push(user);
            return Object.assign({}, userState, { users: users });
        case LOG_IN:
            return Object.assign({}, userState, {
                isUserLogged: true,
                loggedInUser: action.payload,
            });
        case LOG_OUT:
            return Object.assign({}, userState, {
                isUserLogged: false,
                loggedInUser: undefined,
            });
        case RESERVE_SLOT: {
            const { eventId, userId } = action.payload;
            const newUsers = userState.users.map((user: User) => {
                if (user.id === userId) {
                    return { ...user, events: [...user.events, eventId] };
                }
                return user;
            });
            return { ...userState, users: newUsers };
        }
        case DELETE_EVENT:
            const newUsers = userState.users.map((user: User) => {
                const newEvents = user.events.filter((id: number) => {
                    return id != action.payload;
                });
                return { ...user, events: newEvents };
            });
            return { ...userState, users: newUsers };
        default:
            return userState;
    }
};

export default setupUser;
