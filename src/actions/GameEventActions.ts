import * as types from "./ActionTypes";
// eslint-disable-next-line no-unused-vars
import { GameEvent } from "../types/GameEvent";

export const requestAddGameEvent = () => {
    return { type: types.REQUEST_ADD_GAME_EVENT };
};

export const requestAddGameEventSuccess = () => {
    return { type: types.REQUEST_ADD_GAME_EVENT_SUCESS };
};
export const requestAddGameEventFailed = () => {
    return { type: types.REQUEST_ADD_GAME_EVENT_FAILED };
};

export const addGameEvent = (gameEvent: GameEvent) => {
    return { type: types.ADD_GAME_EVENT, payload: gameEvent };
};

export const addGameEvents = (events: GameEvent[]) => {
    return { type: types.ADD_GAME_EVENTS, payload: events };
};

export const deleteGameEvent = (eventId: number) => {
    return { type: types.DELETE_EVENT, payload: eventId };
};

export const editGameEvent = (gameEvent: GameEvent) => {
    return { type: types.EDIT_EVENT, payload: gameEvent };
};
