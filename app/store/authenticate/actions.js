import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import * as types from './action-types';
import { GOOGLE_PROVIDER } from '../../utils/firebase';
import * as firebase_helpers from '../../utils/firebase';
import global from '../../global';

export function initializeGoogleProvider() {
  return dispatch => {
    dispatch({
      type: types.PROVIDER_INITIALIZING,
      provider: GOOGLE_PROVIDER
    });
    GoogleSignin.hasPlayServices({ autoResolve: true })
      .then(() => {
        GoogleSignin.configure({
          iosClientId:
            '815371491076-243sbqkdbs46cgec2kn80a1evmrtqeiq.apps.googleusercontent.com'
        }).then(() => {
          dispatch(setGoogleProviderReady());
        });
      })
      .catch(err => {
        dispatch(initializeError());
      });
  };
}

export function setGoogleProviderReady(autoLogin = true) {
  return dispatch => {
    dispatch(setProviderReady(GOOGLE_PROVIDER));
    if (autoLogin) {
      dispatch(authenticateWithGoogle(true));
    } else {
      dispatch(authenticationDone(GOOGLE_PROVIDER));
    }
  };
}

function authenticationDone(provider) {
  return {
    type: types.AUTHENTICATION_DONE,
    provider: provider
  };
}

function authenticationError(provider) {
  return {
    type: types.AUTHENTICATION_ERROR,
    provider
  };
}

function initializeError() {
  return {
    type: types.INITIALIZATION_ERROR
  };
}

function setProviderReady(provider) {
  return {
    type: types.PROVIDER_INITIALIZED,
    provider: provider,
    initialized: true
  };
}

export function authenticateWithGoogle(silent) {
  return dispatch => {
    dispatch({
      type: types.PROVIDER_AUTHENTICATING,
      provider: GOOGLE_PROVIDER
    });
    GoogleSignin.currentUserAsync().then(user => {
      if (user) {
        dispatch({
          type: types.PROVIDER_AUTHENTICATED,
          provider: GOOGLE_PROVIDER,
          user: user
        });
        if (global.usingFirebaseAuthentication) {
          dispatch(authenticateWithFirebase(GOOGLE_PROVIDER, user));
        } else {
          dispatch(authenticationDone(GOOGLE_PROVIDER));
        }
      } else {
        if (silent) dispatch(authenticationError(GOOGLE_PROVIDER));
        else {
          GoogleSignin.signIn()
            .then(user => {
              console.log(user);
              dispatch(authenticateWithFirebase(GOOGLE_PROVIDER, user));
            })
            .catch(err => {
              dispatch(authenticationError(GOOGLE_PROVIDER));
            });
        }
      }
    });
  };
}

function authenticateWithFirebase(provider, user) {
  return dispatch => {
    dispatch({
      type: types.FIREBASE_AUTHENTICATING,
      provider
    });

    try {
      const credential = firebase_helpers.getCredentialByProvider(
        provider,
        user
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(user => {
          if (user) {
            dispatch({
              type: types.FIREBASE_AUTHENTICATED,
              provider: GOOGLE_PROVIDER,
              user
            });
            dispatch(authenticationDone(GOOGLE_PROVIDER));
          } else {
            dispatch(authenticationError(GOOGLE_PROVIDER));
          }
        });
    } catch (error) {
      dispatch(authenticationError(GOOGLE_PROVIDER));
    }
  };
}
