import { createAuthentication } from './helper';
import { combineReducers } from 'redux';
import { GOOGLE_PROVIDER } from '../../utils/firebase';

const google = createAuthentication(GOOGLE_PROVIDER).reducer;

export default combineReducers({ [GOOGLE_PROVIDER]: google });
