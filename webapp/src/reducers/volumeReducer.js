import { ABC } from '../constant';

export default (state = [], action) => {
  switch (action.type) {
    case ABC:
      return [...state, action.payload];
    default:
      return state;
  }
};
