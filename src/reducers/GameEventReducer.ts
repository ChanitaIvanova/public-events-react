import {
    ADD_GAME_EVENT,
    DELETE_EVENT,
    EDIT_EVENT,
    RESERVE_SLOT,
} from "../actions/ActionTypes";
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
        case EDIT_EVENT:
            return events.map((event: GameEvent) => {
                if (event.id === action.payload.id) {
                    return { ...event, ...action.payload };
                }
                return event;
            });
        case RESERVE_SLOT:
            const { eventId } = action.payload;
            return events.map((event: GameEvent) => {
                if (event.id === eventId) {
                    return { ...event, freeSlots: event.freeSlots - 1 };
                }
                return event;
            });
        default:
            return events;
    }
};

export default gameEvents;
