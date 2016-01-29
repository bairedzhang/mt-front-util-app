import { combineReducers } from 'redux';
import project from './project';
import global from './global';

const rootReducer = combineReducers({
   project,
   global
});

export default rootReducer;
