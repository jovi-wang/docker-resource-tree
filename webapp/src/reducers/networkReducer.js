import { NETWORK } from '../constant';

const INITIAL_STATE = {
  list: [],
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
        list: state.list.filter((i) => !action.payload.includes(i.Name))
      };
    case FETCH:
      return { ...state, list: [...action.payload] };
    default:
      return state;
  }
};
