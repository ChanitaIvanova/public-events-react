/* eslint-disable no-unused-vars */
import { GameEvent } from "../types/GameEvent";
import { User } from "../types/User";
export interface UserState {
    users: User[];
    isUserLogged: boolean;
    loggedInUser: User | undefined;
    isRequestPending: boolean;
}
export interface State {
    events: GameEvent[];
    userState: UserState;
}
export const initialState: State = {
    events: [],
    userState: {
        users: [],
        isUserLogged: false,
        loggedInUser: undefined,
        isRequestPending: false,
    },
};
