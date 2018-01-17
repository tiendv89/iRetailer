import { createAuthentication } from './helper';
import { combineReducers } from 'redux';
import { GOOGLE_PROVIDER } from '../../utils/firebase';
import * as types from './action-types';

const google = createAuthentication(GOOGLE_PROVIDER).reducer;

export default combineReducers({
  [GOOGLE_PROVIDER]: google,
  profile: function(state = {}, action = {}) {
    switch (action.type) {
      case types.SAVE_PROFILE_TO_REDUX:
        return { ...state, ...action.profile };
      default:
        return state;
    }
  }
});
