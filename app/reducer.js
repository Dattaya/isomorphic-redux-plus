import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import about from 'about/reducer';
import auth from 'auth/reducer';
import todo from 'todo/reducer';
import pageStatus from 'status/reducer';

export default combineReducers({ routing, about, auth, todo, pageStatus, reduxAsyncConnect });
