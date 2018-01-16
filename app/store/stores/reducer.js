import * as types from './action-types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case types.CREATE_STORE_SUCCESSFULLY:
      return { ...state, current_store: action.id };
    case types.RETRIEVE_STORE_DETAIL_SUCCESSFULLY:
      return { ...state, [action.id]: action.store };
    default:
      return state;
  }
};
