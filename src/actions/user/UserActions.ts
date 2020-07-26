import { SIGN_IN, LOG_IN, LOG_OUT } from '../ActionTypes'
import { User } from '../../types/User'
import { GameEvent } from '../../types/GameEvent'

export function signIn(user: User) {
    return { type: SIGN_IN, payload: user };
}

export function logIn() {
    return { type: LOG_IN};
}

export function logOut() {
    return { type: LOG_OUT};
}