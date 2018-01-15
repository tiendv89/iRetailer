import firebase from 'react-native-firebase';
import global from '../../global';
import { GOOGLE_PROVIDER } from '../../utils/firebase';
import * as types from './action-types';

export function createStore(name, address, phone) {
  if (global.usingFirebaseAuthentication) {
    return (dispatch, getState) => {
      const uid = getState().authenticate[GOOGLE_PROVIDER].firebase_user._user
        .uid;

      const ref = firebase
        .database()
        .ref('stores')
        .push({
          owner: uid,
          name,
          address,
          phone
        });

      let store_id = ref.key;

      const user_ref = firebase
        .database()
        .ref('users')
        .child(uid)
        .child('stores');

      user_ref.once('value', snapshot => {
        let storeArr = snapshot.val() ? JSON.parse(snapshot.val()) : [];
        storeArr.push(store_id);
        user_ref.set(storeArr);
        dispatch({
          type: types.CREATE_STORE_SUCCESSFULLY
        });
      });
    };
  }
}
