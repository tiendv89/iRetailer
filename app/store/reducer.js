import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appNav from './navigatorApp/reducer';
import retailerNav from './navigatorRetailer/reducer';
import productNav from './navigatorProduct/reducer';
import authenticate from './authenticate/reducer';
import shops from './shops/reducer';
import branches from './branches/reducer';

const shopConfig = {
  key: 'shops',
  storage
};

const branchConfig = {
  key: 'branches',
  storage
};

export default {
  appNav,
  retailerNav,
  productNav,
  authenticate,
  shops: persistReducer(shopConfig, shops),
  branches: persistReducer(branchConfig, branches)
};
