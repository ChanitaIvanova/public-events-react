import { SIGN_IN, LOG_IN, LOG_OUT } from '../ActionTypes'
import { User } from '../../types/User'

export function signIn(user: User) {
    return { type: SIGN_IN, payload: user };
}

export function logIn(id: number) {
    return { type: LOG_IN, payload: id};
}

export function logOut() {
    return { type: LOG_OUT};
}