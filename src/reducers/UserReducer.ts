import { SIGN_IN, LOG_IN, LOG_OUT } from '../actions/ActionTypes'
import { User } from '../types/User'

const initialUserState: any = {
  users: [],
  isUserLogged: false
}

const setupUser = (state: any = initialUserState, action: any={}) => {
  switch (action.type) {
    case SIGN_IN:
      const countUsers = state.users.length;
      let user: User = action.payload;
      user.id = countUsers;
      let users: User[] = [...state.users];
      users.push(user);
      return Object.assign({}, state, { users: users });
    case LOG_IN:
      return Object.assign({}, state, { isUserLogged: true });
    case LOG_OUT:
      return Object.assign({}, state, { isUserLogged: false });
    default:
      return state
  }
}

export default setupUser;