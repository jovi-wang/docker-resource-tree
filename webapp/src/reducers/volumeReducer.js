import { ABC, FETCH } from '../constant';

export default (state = [], action) => {
  switch (action.type) {
    case ABC:
    case FETCH:
      return [...state, action.payload];
    default:
      return state;
  }
};
