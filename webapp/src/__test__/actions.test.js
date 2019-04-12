import configureMockStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { COMMON, VOLUME, NETWORK, CONTAINER, IMAGE } from '../constant';
import * as actions from '../actions';
import dockerAPI from '../dockerAPI';

const middleWares = [reduxThunk];
const mockStore = configureMockStore(middleWares);

const store = mockStore({
  volume: {},
  network: {},
  container: {},
  image: {},
  common: { error: 'error' }
});

jest.mock('../dockerAPI');
afterEach(() => {
  dockerAPI.get.mockClear();
  dockerAPI.post.mockClear();
  dockerAPI.delete.mockClear();
  store.clearActions();
});
afterAll(() => {
  jest.clearAllMocks();
});
const clearErrorAction = { type: COMMON.CLEAR_ERROR };
const errorAction = { type: COMMON.ERROR, payload: 'error' };

describe('test router actions', () => {
  it('should navigate', () => {
    const expectedType = '@@router';
    const expectedPayload = { method: 'push', args: ['/'] };
    const { type, payload } = actions.navigate('/');

    expect(payload).toEqual(expectedPayload);
    expect(type).toEqual(expect.stringContaining(expectedType));
  });
});

describe('test async volume actions', () => {
  it('should fetch volumes - success', async () => {
    const fetchAction = {
      type: VOLUME.FETCH,
      payload: [{ Id: 'volumeId1', Name: 'volumeId1' }]
    };

    dockerAPI.get.mockResolvedValue({ data: { Volumes: [{ Name: 'volumeId1' }] } });
    await store.dispatch(actions.fetchVolumes());

    expect(dockerAPI.get).toBeCalledWith('/volumes');
    expect(dockerAPI.get).toBeCalledTimes(1);

    expect(store.getActions()).toContainEqual(fetchAction);
    expect(store.getActions()).toContainEqual(clearErrorAction);
  });

  it('should inspect volume - success', async () => {
    const inspectAction = {
      type: VOLUME.INSPECT,
      payload: { Id: 'volumeId1', Name: 'volumeId1' }
    };

    dockerAPI.get.mockResolvedValue({ data: { Id: 'volumeId1', Name: 'volumeId1' } });
    await store.dispatch(actions.inspectVolume('volumeId1'));

    expect(dockerAPI.get).toBeCalledWith('/volumes/volumeId1');
    expect(dockerAPI.get).toBeCalledTimes(1);

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(inspectAction);
  });

  it('should inspect volume - fail', async () => {
    dockerAPI.get.mockRejectedValue({ message: 'error' });
    await store.dispatch(actions.inspectVolume('volumeId1'));

    expect(dockerAPI.get).toBeCalledWith('/volumes/volumeId1');
    expect(dockerAPI.get).toBeCalledTimes(1);

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(errorAction);
  });

  it('should prune volumes - success', async () => {
    const pruneAction = {
      type: VOLUME.PRUNE,
      payload: 'volumeId1'
    };

    dockerAPI.post.mockResolvedValue({ data: { VolumesDeleted: 'volumeId1' } });
    await store.dispatch(actions.pruneVolumes());

    expect(dockerAPI.post).toBeCalledWith('/volumes/prune');
    expect(dockerAPI.post).toBeCalledTimes(1);

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(pruneAction);
  });
});

describe('test async network actions', () => {
  it('should fetch networks - success', async () => {
    const fetchAction = {
      type: NETWORK.FETCH,
      payload: [{ Id: 'networkId1' }]
    };

    dockerAPI.get.mockResolvedValue({ data: [{ Id: 'networkId1' }] });

    await store.dispatch(actions.fetchNetworks());

    expect(dockerAPI.get).toBeCalledWith('/networks');
    expect(dockerAPI.get).toBeCalledTimes(1);

    expect(store.getActions()).toContainEqual(fetchAction);
    expect(store.getActions()).toContainEqual(clearErrorAction);
  });

  it('should inspect network - success', async () => {
    const inspectAction = {
      type: NETWORK.INSPECT,
      payload: { Id: 'networkId1' }
    };

    dockerAPI.get.mockResolvedValue({ data: { Id: 'networkId1' } });
    await store.dispatch(actions.inspectNetwork('networkId1'));

    expect(dockerAPI.get).toBeCalledWith('/networks/networkId1');
    expect(dockerAPI.get).toBeCalledTimes(1);

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(inspectAction);
  });

  it('should inspect network - fail', async () => {
    dockerAPI.get.mockRejectedValue({ message: 'error' });
    await store.dispatch(actions.inspectNetwork('networkId1'));

    expect(dockerAPI.get).toBeCalledWith('/networks/networkId1');
    expect(dockerAPI.get).toBeCalledTimes(1);

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(errorAction);
  });

  it('should prune networks - success', async () => {
    const pruneAction = {
      type: NETWORK.PRUNE,
      payload: [{ Id: 'networkId1' }]
    };

    dockerAPI.post.mockResolvedValue({ data: { NetworksDeleted: [{ Id: 'networkId1' }] } });
    await store.dispatch(actions.pruneNetworks());

    expect(dockerAPI.post).toBeCalledWith('/networks/prune');
    expect(dockerAPI.post).toBeCalledTimes(1);

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(pruneAction);
  });
});

describe('test async container actions', () => {
  it('should fetch containers - success', async () => {
    const fetchAction = {
      type: CONTAINER.FETCH,
      payload: [{ Id: 'containerId1' }]
    };

    dockerAPI.get.mockResolvedValue({ data: [{ Id: 'containerId1' }] });

    await store.dispatch(actions.fetchContainers());

    expect(dockerAPI.get).toBeCalledWith('/containers');
    expect(dockerAPI.get).toBeCalledTimes(1);

    expect(store.getActions()).toContainEqual(fetchAction);
    expect(store.getActions()).toContainEqual(clearErrorAction);
  });

  it('should inspect container - success', async () => {
    const inspectAction = {
      type: CONTAINER.INSPECT,
      payload: { Id: 'containerId1' }
    };

    dockerAPI.get.mockResolvedValue({ data: { Id: 'containerId1' } });
    await store.dispatch(actions.inspectContainer('containerId1'));

    expect(dockerAPI.get).toBeCalledWith('/containers/containerId1');
    expect(dockerAPI.get).toBeCalledTimes(1);

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(inspectAction);
  });

  it('should inspect container - fail', async () => {
    dockerAPI.get.mockRejectedValue({ message: 'error' });
    await store.dispatch(actions.inspectContainer('containerId1'));

    expect(dockerAPI.get).toBeCalledWith('/containers/containerId1');
    expect(dockerAPI.get).toBeCalledTimes(1);

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(errorAction);
  });

  it('should prune containers - success', async () => {
    const pruneAction = {
      type: CONTAINER.PRUNE,
      payload: [{ Id: 'containerId1' }]
    };

    dockerAPI.post.mockResolvedValue({
      data: { ContainersDeleted: [{ Id: 'containerId1' }], SpaceReclaimed: 0 }
    });
    await store.dispatch(actions.pruneContainers());

    expect(dockerAPI.post).toBeCalledWith('/containers/prune');
    expect(dockerAPI.post).toBeCalledTimes(1);

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(pruneAction);
  });
});

describe('test async image actions', () => {
  it('should fetch images - success', async () => {
    const fetchAction = {
      type: IMAGE.FETCH,
      payload: [{ Id: 'imageId1' }]
    };

    dockerAPI.get.mockResolvedValue({ data: [{ Id: 'imageId1' }] });

    await store.dispatch(actions.fetchImages());

    expect(dockerAPI.get).toBeCalledWith('/images');
    expect(dockerAPI.get).toBeCalledTimes(1);

    expect(store.getActions()).toContainEqual(fetchAction);
    expect(store.getActions()).toContainEqual(clearErrorAction);
  });

  it('should inspect image - success', async () => {
    const inspectAction = {
      type: IMAGE.INSPECT,
      payload: { Id: 'imageId1' }
    };

    dockerAPI.get.mockResolvedValue({ data: { Id: 'imageId1' } });
    await store.dispatch(actions.inspectImage('imageId1'));

    expect(dockerAPI.get).toBeCalledWith('/images/imageId1');
    expect(dockerAPI.get).toBeCalledTimes(1);

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(inspectAction);
  });

  it('should inspect image - fail', async () => {
    dockerAPI.get.mockRejectedValue({ message: 'error' });
    await store.dispatch(actions.inspectImage('imageId1'));

    expect(dockerAPI.get).toBeCalledWith('/images/imageId1');
    expect(dockerAPI.get).toBeCalledTimes(1);

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(errorAction);
  });

  it('should prune images - success', async () => {
    const pruneAction = {
      type: IMAGE.PRUNE,
      payload: [{ Id: 'imageId1' }]
    };

    dockerAPI.post.mockResolvedValue({ data: { ImagesDeleted: [{ Id: 'imageId1' }] } });
    await store.dispatch(actions.pruneImages());

    expect(dockerAPI.post).toBeCalledWith('/images/prune');
    expect(dockerAPI.post).toBeCalledTimes(1);

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(pruneAction);
  });

  it('should delete image - success', async () => {
    const pruneAction = {
      type: IMAGE.DELETE,
      payload: { Id: 'imageId1' }
    };

    dockerAPI.delete.mockResolvedValue({ data: { Id: 'imageId1' } });
    await store.dispatch(actions.deleteImage('imageId1'));

    expect(store.getActions()).toHaveLength(2);
    expect(store.getActions()).toContainEqual(pruneAction);

    expect(dockerAPI.delete).toBeCalledWith('/images/imageId1');
    expect(dockerAPI.delete).toBeCalledTimes(1);

    const navigateAction = store.getActions().find((i) => i.type.includes('@@router'));

    expect(navigateAction.payload).toEqual({ method: 'push', args: ['/images'] });
  });
});
