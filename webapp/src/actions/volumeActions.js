import { FETCH_ALL_VOLUMES, FETCH_SINGLE_VOLUME } from '../constant';
import dockerAPI from '../dockerAPI';

export const fetchVolumes = () => async (dispatch) => {
  const response = await dockerAPI.get('/volumes');
  dispatch({ type: FETCH_ALL_VOLUMES, payload: response.data.Volumes });
};

export const fetchVolume = (volumeName) => async (dispatch) => {
  const response = await dockerAPI.get(`/volumes/${volumeName}`);
  console.log(response.data);
  dispatch({ type: FETCH_SINGLE_VOLUME, payload: response.data });
};
