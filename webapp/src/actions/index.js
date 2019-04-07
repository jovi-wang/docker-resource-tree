import { push } from 'connected-react-router';

import { FETCH_VOLUMES, INSPECT_VOLUME, FETCH_NETWORKS, INSPECT_NETWORK } from '../constant';
import dockerAPI from '../dockerAPI';

export const fetchVolumes = () => async (dispatch) => {
  const { data } = await dockerAPI.get('/volumes');
  dispatch({ type: FETCH_VOLUMES, payload: data.Volumes });
};

export const inspectVolume = (volumeName) => async (dispatch) => {
  const { data } = await dockerAPI.get(`/volumes/${volumeName}`);
  console.log(data);
  dispatch({ type: INSPECT_VOLUME, payload: data });
};

export const pruneVolumes = () => async (dispatch) => {
  const { data } = await dockerAPI.post(`/volumes/prune`);
  console.log(data.VolumesDeleted);
  dispatch({ type: 'VolumesDeleted' });
  dispatch(push('/'));
};

export const fetchNetworks = () => async (dispatch) => {
  const response = await dockerAPI.get('/networks');
  dispatch({ type: FETCH_NETWORKS, payload: response.data });
};

export const inspectNetwork = (networkId) => async (dispatch) => {
  const response = await dockerAPI.get(`/networks/${networkId}`);
  console.log(response.data);
  dispatch({ type: INSPECT_NETWORK, payload: response.data });
};

export const pruneNetworks = () => async (dispatch) => {
  const { data } = await dockerAPI.post(`/networks/prune`);
  console.log(data.NetworksDeleted);
  dispatch({ type: 'NetworksDeleted' });
};

export const fetchContainers = () => async (dispatch) => {
  const response = await dockerAPI.get('/containers');
  dispatch({ type: FETCH_NETWORKS, payload: response.data });
};

export const inspectContainer = (networkId) => async (dispatch) => {
  const response = await dockerAPI.get(`/containers/${networkId}`);
  console.log(response.data);
  dispatch({ type: INSPECT_NETWORK, payload: response.data });
};

export const pruneContainers = () => async (dispatch) => {
  const { data } = await dockerAPI.post(`/containers/prune`);
  console.log(data);
  dispatch({ type: 'ContainersDeleted' });
};
