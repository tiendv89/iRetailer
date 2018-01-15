import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appNav from './navigatorApp/reducer';
import authenticate from './authenticate/reducer';

const config = {
  key: 'root',
  blacklist: ['regimenInfo', 'appNav'],
  storage
};

export default {
  appNav,
  authenticate
};
