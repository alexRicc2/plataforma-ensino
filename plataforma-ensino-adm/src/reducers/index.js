


import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import SnackbarReducer from './SnackbarReducer';
import StylesReducer from './StylesReducer';
export default combineReducers({
   AppReducer,
   SnackbarReducer,
   StylesReducer
});