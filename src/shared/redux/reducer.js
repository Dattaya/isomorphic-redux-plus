import { combineReducers }           from 'redux';
import { routerReducer as routing }  from 'react-router-redux';

import about         from 'redux/about/aboutReducer';
import auth          from 'redux/auth/authReducer';
import todo          from 'redux/todo/todoReducer';
import pageStatus    from 'redux/status/statusReducer';

export default combineReducers({ routing, about, auth, todo, pageStatus });
