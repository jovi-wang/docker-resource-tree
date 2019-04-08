import { push } from 'connected-react-router';

import { VOLUME, NETWORK, CONTAINER } from '../constant';
import dockerAPI from '../dockerAPI';

export const navigate = (path) => {
  return push(path);
};

export const fetchVolumes = () => async (dispatch) => {
  const { data } = await dockerAPI.get('/volumes');
  dispatch({ type: VOLUME.FETCH, payload: data.Volumes.map((i) => ({ ...i, Id: i.Name })) });
};

export const inspectVolume = (volumeName) => async (dispatch) => {
  const { data } = await dockerAPI.get(`/volumes/${volumeName}`);
  console.log(data);
  dispatch({ type: VOLUME.INSPECT, payload: data });
};

export const pruneVolumes = () => async (dispatch) => {
  const { data } = await dockerAPI.post(`/volumes/prune`);
  dispatch({ type: VOLUME.PRUNE, payload: data.VolumesDeleted });
  dispatch(navigate('/'));
};

export const fetchNetworks = () => async (dispatch) => {
  const { data } = await dockerAPI.get('/networks');
  dispatch({ type: NETWORK.FETCH, payload: data });
};

export const inspectNetwork = (networkId) => async (dispatch) => {
  const { data } = await dockerAPI.get(`/networks/${networkId}`);
  dispatch({ type: NETWORK.INSPECT, payload: data });
};

export const pruneNetworks = () => async (dispatch) => {
  const { data } = await dockerAPI.post(`/networks/prune`);
  console.log(data);
  dispatch({ type: NETWORK.PRUNE, payload: data.NetworksDeleted || [] });
};

export const fetchContainers = () => async (dispatch) => {
  const { data } = await dockerAPI.get('/containers');
  dispatch({ type: CONTAINER.FETCH, payload: data });
};

export const inspectContainer = (networkId) => async (dispatch) => {
  const { data } = await dockerAPI.get(`/containers/${networkId}`);
  dispatch({ type: CONTAINER.INSPECT, payload: data });
};

export const pruneContainers = () => async (dispatch) => {
  const { data } = await dockerAPI.post(`/containers/prune`);
  console.log('space reclaimed after delete stopped containers', data.SpaceReclaimed);
  dispatch({ type: CONTAINER.PRUNE, payload: data.ContainersDeleted || [] });
};
