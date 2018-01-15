import { combineReducers, applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducer';

const reducer = combineReducers(reducers);

const store = createStore(reducer, applyMiddleware(thunk, logger));
persistStore(store);

export default store;
