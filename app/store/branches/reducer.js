import * as types from './action-types';
import * as shared_types from '../shared/action-types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case shared_types.CREATE_BRANCH_SUCCESSFULLY:
      return { ...state, current_branch: action.id, [action.id]: action.data };
    case types.SET_CURRENT_BRANCH:
      return { ...state, current_branch: action.id };
    case types.RETRIEVE_BRANCH_DETAIL_SUCCESSFULLY:
      return { ...state, [action.id]: action.branch };
    case types.RETRIEVE_BRANCH_DETAIL_FAILED:
      return { ...state, [action.id]: { error: action.error } };
    default:
      return state;
  }
};
