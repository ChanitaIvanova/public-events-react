import { ADD_GAME_EVENT, DELETE_EVENT } from "../actions/ActionTypes";
// eslint-disable-next-line no-unused-vars
import { GameEvent } from "../types/GameEvent";

const initialEventsState: any = {
    events: [],
};

const gameEvents = (state: any = initialEventsState, action: any = {}) => {
    switch (action.type) {
        case ADD_GAME_EVENT: {
            const countEvents = state.events.length;
            const event: GameEvent = action.payload;
            event.id = countEvents;
            const events: GameEvent[] = [...state.events];
            events.push(event);
            return Object.assign({}, state, { events: events });
        }
        case DELETE_EVENT:
            const events = state.events.filter((event: GameEvent) => {
                return event.id !== action.payload;
            });
            return Object.assign({}, state, { events });
        default:
            return state;
    }
};

export default gameEvents;
