import { SIGN_IN, LOG_IN, LOG_OUT } from "../actions/ActionTypes";
// eslint-disable-next-line no-unused-vars
import { User } from "../types/User";
import { initialState } from "./initialState";

const setupUser = (
    userState: any = initialState.userState,
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
        default:
            return userState;
    }
};

export default setupUser;
