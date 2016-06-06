import { combineReducers }           from 'redux';
import { routerReducer as routing }  from 'react-router-redux';

import about         from 'redux/about/reducer';
import auth          from 'redux/auth/reducer';
import todo          from 'redux/todo/reducer';
import pageStatus    from 'redux/status/reducer';

export default combineReducers({ routing, about, auth, todo, pageStatus });
