import * as types from './action-types';
import firebase from 'react-native-firebase';

export function getBranchDetail(id) {
  return (dispatch, getState) => {
    let branch_id = id ? id : getState().branches.current_branch;
    if (!branch_id) {
      branch_id = getState().authenticate.profile.branches[0];
      if (branch_id)
        dispatch({
          type: types.SET_CURRENT_BRANCH,
          id: branch_id
        });
    }

    if (branch_id) {
      firebase
        .database()
        .ref('branches/' + branch_id)
        .once('value')
        .then(snapshot => {
          let branch = snapshot.val();

          if (branch) {
            dispatch({
              type: types.RETRIEVE_BRANCH_DETAIL_SUCCESSFULLY,
              id: branch_id,
              branch
            });
          } else {
            dispatch({
              type: types.RETRIEVE_BRANCH_DETAIL_FAILED,
              id: branch_id,
              error: 403
            });
          }
        });
    } else {
      dispatch({
        type: types.RETRIEVE_BRANCH_DETAIL_FAILED,
        id: branch_id,
        error: 404
      });
    }
  };
}

export function setCurrentBranch(id) {
  return dispatch => {
    return dispatch({
      type: types.SET_CURRENT_BRANCH,
      id
    });
  };
}
