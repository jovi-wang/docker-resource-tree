// import _ from 'lodash';

import { NETWORK } from '../constant';

const INITIAL_STATE = {
  networkArray: [],
  inspected: {}
};

export default (state = INITIAL_STATE, action) => {
  const { FETCH, INSPECT, PRUNE } = NETWORK;
  switch (action.type) {
    case INSPECT:
      return { ...state, inspected: action.payload };
    case PRUNE:
      return {
        ...state,
        networkArray: state.networkArray.filter((i) => !action.payload.includes(i.Name))
      };
    case FETCH:
      return { ...state, networkArray: [...action.payload] };
    default:
      return state;
  }
};
