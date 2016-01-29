import {SAVE_GLOBAL} from '../actions/project'

export default (state = {}, action) => {
  switch (action.type) {
    case SAVE_GLOBAL:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}
