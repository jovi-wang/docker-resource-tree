import { INSPECT_NETWORK, FETCH_NETWORKS } from '../constant';

export default (state = [], action) => {
  switch (action.type) {
    // case INSPECT_NETWORK:
    //   return [...state];
    case FETCH_NETWORKS:
      return [...state, action.payload];
    default:
      return state;
  }
};
