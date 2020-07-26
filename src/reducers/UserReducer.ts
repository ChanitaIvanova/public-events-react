import { SIGN_IN, GET_USER, LOG_IN, IS_LOGGED_IN, LOG_OUT } from '../actions/ActionTypes'
import { User } from '../types/User'

const initialUserState: any = {
  user: new User(),
  isUserLogged: false
}

const setupUser = (state: any = initialUserState, action: any={}) => {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, state, { user: action.payload });
    case LOG_IN:
      return Object.assign({}, state, { isUserLogged: true });
    case LOG_OUT:
      return Object.assign({}, state, { isUserLogged: false });
    case GET_USER:
      return state.user;
    case IS_LOGGED_IN:
      return state.isUserLogged;
    default:
      return state
  }
}

export default setupUser;