import { COMMON } from '../constant';

const INITIAL_STATE = {
  error: ''
};
export default (state = INITIAL_STATE, action) => {
  const { ERROR, CLEAR_ERROR } = COMMON;
  switch (action.type) {
    case ERROR:
      return { error: action.payload };
    case CLEAR_ERROR:
      return { error: '' };
    default:
      return state;
  }
};
