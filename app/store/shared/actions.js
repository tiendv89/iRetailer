import firebase from 'react-native-firebase';
import global from '../../global';
import { GOOGLE_PROVIDER } from '../../utils/firebase';
import * as types from './action-types';

export function createStore(path, data) {
  if (global.usingFirebaseAuthentication) {
    return (dispatch, getState) => {
      const uid = getState().authenticate[GOOGLE_PROVIDER].firebase_user._user
        .uid;

      let pushData = {
        user: {
          owner: uid
        },
        ...data
      };
      const ref = firebase
        .database()
        .ref(path)
        .push(pushData);

      let id = ref.key;

      dispatch({
        type:
          path === 'shops'
            ? types.CREATE_STORE_SUCCESSFULLY
            : types.CREATE_BRANCH_SUCCESSFULLY,
        id: id,
        data: pushData
      });

      const user_ref = firebase
        .database()
        .ref('users')
        .child(uid)
        .child(path);

      user_ref.once('value', snapshot => {
        let arr = snapshot.val() ? JSON.parse(snapshot.val()) : [];
        arr.push(id);
        user_ref.set(arr);
      });

      if (path === 'shops' && data.branch) {
        const branch_ref = firebase
          .database()
          .ref('branches')
          .child(data.branch)
          .child('shops');

        branch_ref.once('value', snapshot => {
          let arr = snapshot.val() ? JSON.parse(snapshot.val()) : [];
          arr.push(id);
          branch_ref.set(arr);
        });
      }
    };
  }
}
