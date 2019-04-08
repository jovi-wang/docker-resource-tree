import { IMAGE } from '../constant';

const INITIAL_STATE = {
  list: [],
  inspected: {}
};
export default (state = INITIAL_STATE, action) => {
  const { FETCH, INSPECT, PRUNE, TAG } = IMAGE;
  switch (action.type) {
    case INSPECT:
      return { ...state, inspected: action.payload };
    case PRUNE:
      return {
        ...state,
        list: state.list.filter((i) => !action.payload.includes(i.Id))
      };
    case FETCH:
      return { ...state, list: action.payload };
    case TAG:
      console.log(action.payload);
      return { ...state };
    default:
      return state;
  }
};
