import { combineReducers }           from 'redux';
import { routerReducer as routing }  from 'react-router-redux';

import * as reducers from 'redux/reducers';

export default combineReducers({ ...reducers, routing });
