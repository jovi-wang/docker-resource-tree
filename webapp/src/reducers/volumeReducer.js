import { INSPECT_VOLUME, FETCH_VOLUMES } from '../constant';

export default (state = [], action) => {
  switch (action.type) {
    case INSPECT_VOLUME:
      console.log(action.payload);
      return [...state];
    case FETCH_VOLUMES:
      return [...state, action.payload];
    default:
      return state;
  }
};
