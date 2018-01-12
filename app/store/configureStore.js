import {applyMiddleware, createStore} from "redux";
import {persistCombineReducers, persistStore} from "redux-persist";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';
import reducers from "./reducer";

const config = {
    key: 'root',
    blacklist: ["regimenInfo", "appNav"],
    storage,
};

const reducer = persistCombineReducers(config, reducers);

const store = createStore(
    reducer,
    applyMiddleware(thunk, logger)
);
persistStore(store);

export default store;
