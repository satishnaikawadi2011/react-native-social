import { combineReducers, createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';

import screamReducer from './reducers/screams';
import userReducer from './reducers/users';
import uiReducer from './reducers/ui';

const rootReducer = combineReducers({
	scream : screamReducer,
	user   : userReducer,
	UI     : uiReducer
});

const store = createStore(rootReducer, applyMiddleware(Thunk));

export default store;
