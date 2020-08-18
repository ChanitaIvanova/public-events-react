import { ADD_GAME_EVENT, DELETE_EVENT } from "../actions/ActionTypes";
// eslint-disable-next-line no-unused-vars
import { GameEvent } from "../types/GameEvent";
import { initialState } from "./initialState";

const gameEvents = (events: any = initialState.events, action: any = {}) => {
    switch (action.type) {
        case ADD_GAME_EVENT: {
            const countEvents = events.length;
            const event: GameEvent = action.payload;
            event.id = countEvents;
            return [...events, event];
        }
        case DELETE_EVENT:
            const newEvents = events.filter((event: GameEvent) => {
                return event.id !== action.payload;
            });
            return newEvents;
        default:
            return events;
    }
};

export default gameEvents;
