import { SIGN_IN, LOG_IN, GET_USER, IS_LOGGED_IN, ADD_GAME_EVENT, LOG_OUT } from '../ActionTypes'
import { User } from '../../types/User'
import { GameEvent } from '../../types/GameEvent'

export function signIn(user: User) {
    return { type: SIGN_IN, payload: user };
}

export function getUser() {
    return { type: GET_USER };
}

export function logIn() {
    return { type: LOG_IN};
}

export function logOut() {
    return { type: LOG_OUT};
}

export function isLoggedIn() {
    return { type: IS_LOGGED_IN };
}

export function addGameEvent(event: GameEvent) {
    return { type: ADD_GAME_EVENT, payload: event };
}