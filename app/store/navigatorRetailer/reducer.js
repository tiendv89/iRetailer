import { RetailerNavigator } from '../../navigators/RetailerNavigator';

const initialNavState = RetailerNavigator.router.getStateForAction(
  RetailerNavigator.router.getActionForPathAndParams('Main')
);

export default (state = initialNavState, action) => {
  const nextState = RetailerNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
