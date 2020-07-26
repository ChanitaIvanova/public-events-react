import { ADD_GAME_EVENT } from './ActionTypes'
import { GameEvent } from '../types/GameEvent'

export function addGameEvent(event: GameEvent) {
    return { type: ADD_GAME_EVENT, payload: event };
}