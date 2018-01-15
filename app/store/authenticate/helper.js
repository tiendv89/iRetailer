import { combineReducers } from 'redux';
import * as types from './action-types';

const STATE_UNINITIALIZED = 0;
const STATE_INITIALIZING = 1;
const STATE_INITIALIZED_ERROR = 2;
export const STATE_INITIALIZED = 3;
const STATE_AUTHENTICATING_WITH_PROVIDER = 4;
const STATE_AUTHENTICATED_WITH_PROVIDER = 5;
const STATE_AUTHENTICATING_WITH_FIREBASE = 6;
const STATE_AUTHENTICATED_WITH_FIREBASE = 7;
export const STATE_AUTHENTICATED_DONE = 8;
export const STATE_AUTHENTICATED_ERROR = 9;

export function createAuthentication(provider) {
  return {
    reducer: combineReducers({
      status: (status = STATE_UNINITIALIZED, action = {}) => {
        if (!action.provider || action.provider != provider) return status;
        switch (action.type) {
          case types.PROVIDER_INITIALIZING:
            return STATE_INITIALIZING;
          case types.INITIALIZATION_ERROR:
            return STATE_INITIALIZED_ERROR;
          case types.PROVIDER_AUTHENTICATING:
            return STATE_AUTHENTICATING_WITH_PROVIDER;
          case types.FIREBASE_AUTHENTICATING:
            return STATE_AUTHENTICATING_WITH_FIREBASE;
          case types.PROVIDER_INITIALIZED:
            return STATE_INITIALIZED;
          case types.PROVIDER_AUTHENTICATED:
            return STATE_AUTHENTICATED_WITH_PROVIDER;
          case types.FIREBASE_AUTHENTICATED:
            return STATE_AUTHENTICATED_WITH_FIREBASE;
          case types.AUTHENTICATION_DONE:
            return STATE_AUTHENTICATED_DONE;
          case types.AUTHENTICATION_ERROR:
            return STATE_AUTHENTICATED_ERROR;
          default:
            return status;
        }
      },
      provider_user: (user = {}, action = {}) => {
        if (!action.provider || action.provider != provider) return user;
        switch (action.type) {
          case types.PROVIDER_AUTHENTICATED:
            return action.user;
          default:
            return user;
        }
      },
      firebase_user: (user = {}, action = {}) => {
        if (!action.provider || action.provider != provider) return user;
        switch (action.type) {
          case types.FIREBASE_AUTHENTICATED:
            return action.user;
          default:
            return user;
        }
      }
    })
  };
}
