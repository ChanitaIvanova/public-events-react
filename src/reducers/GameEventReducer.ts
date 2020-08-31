import {
    FREE_SLOT,
    ADD_GAME_EVENT,
    DELETE_EVENT,
    EDIT_EVENT,
    RESERVE_SLOT,
    ADD_GAME_EVENTS,
    REQUEST_GAME_EVENTS_DATA,
    GAME_EVENTS_DATA_RETRIEVED,
} from "../actions/ActionTypes";
// eslint-disable-next-line no-unused-vars
import { GameEvent } from "../types/GameEvent";
import { initialState } from "./initialState";

const gameEvents = (
    eventsState: any = initialState.eventsState,
    action: any = {}
) => {
    switch (action.type) {
        case ADD_GAME_EVENT: {
            const event: GameEvent = action.payload;
            return { ...eventsState, events: [...eventsState.events, event] };
        }
        case ADD_GAME_EVENTS: {
            const events: GameEvent = action.payload;
            return { ...eventsState, events };
        }
        case DELETE_EVENT: {
            const newEvents = eventsState.events.filter((event: GameEvent) => {
                return event.id !== action.payload;
            });
            return { ...eventsState, events: newEvents };
        }
        case EDIT_EVENT: {
            const newEvents = eventsState.events.map((event: GameEvent) => {
                if (event.id === action.payload.id) {
                    return { ...event, ...action.payload };
                }
                return event;
            });
            return { ...eventsState, events: newEvents };
        }
        case RESERVE_SLOT: {
            const { eventId } = action.payload;
            const newEvents = eventsState.events.map((event: GameEvent) => {
                if (event.id === eventId) {
                    return { ...event, freeSlots: event.freeSlots - 1 };
                }
                return event;
            });
            return { ...eventsState, events: newEvents };
        }
        case FREE_SLOT: {
            const { eventId } = action.payload;
            const newEvents = eventsState.events.map((event: GameEvent) => {
                if (event.id === eventId) {
                    return { ...event, freeSlots: event.freeSlots + 1 };
                }
                return event;
            });

            return { ...eventsState, events: newEvents };
        }
        case REQUEST_GAME_EVENTS_DATA:
            return {
                ...eventsState,
                retrievingData: true,
            };
        case GAME_EVENTS_DATA_RETRIEVED:
            return {
                ...eventsState,
                retrievingData: false,
            };
        default:
            return eventsState;
    }
};

export default gameEvents;
