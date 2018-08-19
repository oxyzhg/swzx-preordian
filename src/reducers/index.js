import { combineReducers } from 'redux';
import baseUrl from './baseUrl';
import adminData from './adminData';
import selectedInfo from './selectedInfo';

export default combineReducers({
  baseUrl,
  adminData,
  selectedInfo
});
