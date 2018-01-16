import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appNav from './navigatorApp/reducer';
import authenticate from './authenticate/reducer';
import stores from './stores/reducer';

const config = {
  key: 'root',
  storage
};

export default {
  appNav,
  authenticate,
  stores: persistReducer(config, stores)
};
