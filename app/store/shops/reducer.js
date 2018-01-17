import * as types from './action-types';
import * as shared_types from '../shared/action-types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case shared_types.CREATE_STORE_SUCCESSFULLY:
      return { ...state, current_shop: action.id, [action.id]: action.data };
    case types.RETRIEVE_STORE_DETAIL_SUCCESSFULLY:
      return { ...state, [action.id]: action.shop };
    case types.SET_CURRENT_SHOP:
      return { ...state, current_shop: action.id };
    default:
      return state;
  }
};
