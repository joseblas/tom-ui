import { combineReducers } from 'redux';
import data from '../data/reducer';
import appStates from '../loading/reducer';

// you can combine all your other reducers under a single namespace like so
export default combineReducers({
  data,
  appStates,
});
