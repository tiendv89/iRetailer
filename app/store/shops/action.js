import * as types from './action-types';

export function getStoreDetail() {
  return (dispatch, getState) => {
    const id = getState().shops.current_shop;

    if (id) {
      firebase
        .database()
        .ref('shops/' + id)
        .once('value')
        .then(snapshot => {
          const shop = snapshot.val();
          if (shop) {
            dispatch({
              type: types.RETRIEVE_STORE_DETAIL_SUCCESSFULLY,
              id,
              shop
            });
          } else {
            dispatch({
              type: types.RETRIEVE_STORE_DETAIL_FAILED
            });
          }
        });
    } else
      dispatch({
        type: types.RETRIEVE_STORE_DETAIL_FAILED
      });
  };
}
