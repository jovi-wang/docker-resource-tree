import { VOLUME } from '../constant';

const INITIAL_STATE = {
  volumeArray: [],
  inspected: {}
};

export default (state = INITIAL_STATE, action) => {
  const { FETCH, INSPECT, PRUNE } = VOLUME;
  switch (action.type) {
    case INSPECT:
      console.log(action.payload);
      return { ...state, inspected: action.payload };
    case PRUNE:
      return {
        ...state,
        volumeArray: state.volumeArray.filter((i) => !action.payload.includes(i.Name))
      };
    case FETCH:
      return { ...state, volumeArray: [...action.payload] };
    default:
      return state;
  }
};
