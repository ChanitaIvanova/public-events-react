/* eslint-disable no-unused-vars */
import { GameEvent } from "../types/GameEvent";
import { User } from "../types/User";
export interface UserState {
    users: User[];
    isUserLogged: boolean;
    loggedInUser: User | undefined;
    isRequestPending: boolean;
    retrievingData: boolean;
}

export interface EventsState {
    events: GameEvent[];
    retrievingData: boolean;
}
export interface State {
    eventsState: EventsState;
    userState: UserState;
}
export const initialState: State = {
    eventsState: {
        events: [],
        retrievingData: true,
    },
    userState: {
        users: [],
        isUserLogged: false,
        loggedInUser: undefined,
        isRequestPending: false,
        retrievingData: true,
    },
};
