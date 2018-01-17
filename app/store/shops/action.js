import * as types from './action-types';
import firebase from 'react-native-firebase';

export function getStoreDetail(id) {
  return (dispatch, getState) => {
    let shop_id = id ? id : getState().shops.current_shop;

    if (!shop_id) {
      shop_id = getState().authenticate.profile.shops[0];
      if (shop_id)
        dispatch({
          type: types.SET_CURRENT_SHOP,
          id: shop_id
        });
    }
    if (shop_id) {
      firebase
        .database()
        .ref('shops/' + shop_id)
        .once('value')
        .then(snapshot => {
          const shop = snapshot.val();
          if (shop) {
            dispatch({
              type: types.RETRIEVE_STORE_DETAIL_SUCCESSFULLY,
              id: shop_id,
              shop
            });
          } else {
            dispatch({
              type: types.RETRIEVE_STORE_DETAIL_FAILED,
              id: shop_id
            });
          }
        });
    } else
      dispatch({
        type: types.RETRIEVE_STORE_DETAIL_FAILED
      });
  };
}
