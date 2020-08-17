import { ADD_GAME_EVENT, DELETE_EVENT } from "./ActionTypes";
// eslint-disable-next-line no-unused-vars
import { GameEvent } from "../types/GameEvent";

export const addGameEvent = (event: GameEvent) => {
    return { type: ADD_GAME_EVENT, payload: event };
};

export const deleteGameEvent = (eventId: number) => {
    return { type: DELETE_EVENT, payload: eventId };
};
