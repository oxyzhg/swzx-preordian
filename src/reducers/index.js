import { combineReducers } from 'redux';
import baseUrl from './baseUrl';
import admin from './admin';
import auth from './auth';
import selected from './selected';

export default combineReducers({
  baseUrl,
  admin,
  auth,
  selected
});
