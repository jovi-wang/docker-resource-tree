import { IMAGE } from '../constant';

const INITIAL_STATE = {
  list: [],
  inspected: {}
};
export default (state = INITIAL_STATE, action) => {
  const { FETCH, INSPECT, PRUNE, TAG, DELETE } = IMAGE;
  let tempArray;
  switch (action.type) {
    case INSPECT:
      return { ...state, inspected: action.payload };
    case PRUNE:
    case DELETE:
      tempArray = action.payload.map((i) => i.Deleted);
      return {
        ...state,
        list: state.list.filter((i) => !tempArray.includes(i.Id))
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
