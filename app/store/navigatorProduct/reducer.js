import { ProductNavigator } from '../../navigators/ProductNavigator';

const initialNavState = ProductNavigator.router.getStateForAction(
  ProductNavigator.router.getActionForPathAndParams('ProductManagement')
);

export default (state = initialNavState, action) => {
  if (action.label === 'product') {
    const nextState = ProductNavigator.router.getStateForAction(action, state);

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
  } else return state;
};
