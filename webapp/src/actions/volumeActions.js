import { ABC, FETCH } from '../constant';
import dockerAPI from '../dockerAPI';

export const fetchStreams = () => async (dispatch) => {
  const response = await dockerAPI.get('/todos/1');
  console.log(response.data);
  dispatch({ type: FETCH, payload: response.data });
};
export const saveComment = () => {
  return {
    type: ABC,
    payload: 'abc'
  };
};
