import { ADD_GAME_EVENT } from '../actions/ActionTypes'
import { GameEvent } from '../types/GameEvent'

const initialEventsState: any = {
  events: []
}

const gameEvents = (state: any = initialEventsState, action: any={}) => {
  switch (action.type) {
    case ADD_GAME_EVENT:
        const countEvents = state.events.length;
        let event: GameEvent = action.payload;
        event.id = countEvents;
        let events: GameEvent[] = [...state.events];
        events.push(event);
        return Object.assign({}, state, { events: events });
    default:
      return state
  }
}

export default gameEvents;