import {combineReducers} from 'redux';

import {reducer as formReducer} from 'redux-form';
import {routeReducer} from 'redux-simple-router';

export default combineReducers({
  routing: routeReducer,
  form: formReducer
});
