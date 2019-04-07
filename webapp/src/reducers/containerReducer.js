import { CONTAINER } from '../constant';

const INITIAL_STATE = {
  containerArray: [],
  inspected: {}
};
export default (state = INITIAL_STATE, action) => {
  const { FETCH, INSPECT, PRUNE } = CONTAINER;
  switch (action.type) {
    case INSPECT:
      return { ...state, inspected: action.payload };
    case PRUNE:
      console.log(action.payload);
      return {
        ...state,
        containerArray: state.containerArray.filter((i) => !action.payload.includes(i.Id))
      };
    case FETCH:
      return { ...state, containerArray: action.payload };
    default:
      return state;
  }
};
