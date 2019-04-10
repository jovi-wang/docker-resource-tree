import { push } from 'connected-react-router';

import { VOLUME, NETWORK, CONTAINER, IMAGE, COMMON } from './constant';
import dockerAPI from './dockerAPI';

export const navigate = (path) => {
  return push(path);
};

// volume actions
export const fetchVolumes = () => async (dispatch, getState) => {
  const { error } = getState().common;
  if (error) dispatch({ type: COMMON.CLEAR_ERROR });

  const { data } = await dockerAPI.get('/volumes');
  dispatch({ type: VOLUME.FETCH, payload: data.Volumes.map((i) => ({ ...i, Id: i.Name })) });
};

export const inspectVolume = (volumeName) => async (dispatch) => {
  try {
    const { data } = await dockerAPI.get(`/volumes/${volumeName}`);
    dispatch({ type: VOLUME.INSPECT, payload: data });
  } catch (err) {
    dispatch({ type: COMMON.ERROR, payload: err.message });
  }
};

export const pruneVolumes = () => async (dispatch) => {
  const { data } = await dockerAPI.post(`/volumes/prune`);
  dispatch({ type: VOLUME.PRUNE, payload: data.VolumesDeleted });
};
// network actions
export const fetchNetworks = () => async (dispatch, getState) => {
  const { error } = getState().common;
  if (error) dispatch({ type: COMMON.CLEAR_ERROR });

  const { data } = await dockerAPI.get('/networks');
  dispatch({ type: NETWORK.FETCH, payload: data });
};

export const inspectNetwork = (networkId) => async (dispatch) => {
  try {
    const { data } = await dockerAPI.get(`/networks/${networkId}`);
    dispatch({ type: NETWORK.INSPECT, payload: data });
  } catch (err) {
    dispatch({ type: COMMON.ERROR, payload: err.message });
  }
};

export const pruneNetworks = () => async (dispatch) => {
  const { data } = await dockerAPI.post(`/networks/prune`);
  dispatch({ type: NETWORK.PRUNE, payload: data.NetworksDeleted || [] });
};
// container actions
export const fetchContainers = () => async (dispatch, getState) => {
  const { error } = getState().common;
  if (error) dispatch({ type: COMMON.CLEAR_ERROR });

  const { data } = await dockerAPI.get('/containers');
  dispatch({ type: CONTAINER.FETCH, payload: data });
};

export const inspectContainer = (containerId) => async (dispatch) => {
  try {
    const { data } = await dockerAPI.get(`/containers/${containerId}`);
    dispatch({ type: CONTAINER.INSPECT, payload: data });
  } catch (err) {
    dispatch({ type: COMMON.ERROR, payload: err.message });
  }
};

export const pruneContainers = () => async (dispatch) => {
  const { data } = await dockerAPI.post(`/containers/prune`);
  console.log('space reclaimed after delete stopped containers', data.SpaceReclaimed);
  dispatch({ type: CONTAINER.PRUNE, payload: data.ContainersDeleted || [] });
};
// image actions
export const fetchImages = () => async (dispatch, getState) => {
  const { error } = getState().common;
  if (error) dispatch({ type: COMMON.CLEAR_ERROR });

  const { data } = await dockerAPI.get('/images');
  dispatch({ type: IMAGE.FETCH, payload: data });
};

export const inspectImage = (networkId) => async (dispatch) => {
  try {
    const { data } = await dockerAPI.get(`/images/${networkId}`);
    dispatch({ type: IMAGE.INSPECT, payload: data });
  } catch (err) {
    dispatch({ type: COMMON.ERROR, payload: err.message });
  }
};

export const pruneImages = () => async (dispatch) => {
  const { data } = await dockerAPI.post(`/images/prune`);
  dispatch({ type: IMAGE.PRUNE, payload: data.ImagesDeleted || [] });
};

export const deleteImage = (imageId) => async (dispatch) => {
  try {
    const { data } = await dockerAPI.delete(`/images/${imageId}`);
    dispatch({ type: IMAGE.DELETE, payload: data });
    dispatch(navigate('/images'));
  } catch (err) {
    console.log(err);
    dispatch({ type: COMMON.ERROR, payload: err.message });
  }
};
