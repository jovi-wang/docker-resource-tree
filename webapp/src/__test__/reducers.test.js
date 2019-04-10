import volumeReducer from '../reducers/volumeReducer';
import commonReducer from '../reducers/commonReducer';
import networkReducer from '../reducers/networkReducer';
import imageReducer from '../reducers/imageReducer';
import containerReducer from '../reducers/containerReducer';

import { VOLUME, IMAGE, COMMON, NETWORK, CONTAINER } from '../constant';

const RESOURCE_INITIAL_STATE = {
  list: [],
  inspected: {}
};
const ERROR_INITIAL_STATE = { error: '' };
// global variable for mockDataList
const mockDataList = [{ Id: '1', Name: 'a' }, { Id: '2', Name: 'b' }, { Id: '3', Name: 'c' }];
const mockInspectedData = { Id: 'id', Name: 'name' };
const mockFetchState = { list: mockDataList, inspected: {} };
const mockInspectState = { list: [], inspected: mockInspectedData };

describe('volume reducer test', () => {
  const { FETCH, INSPECT, PRUNE } = VOLUME;
  it('should return the initial state', () => {
    expect(volumeReducer(undefined, {})).toEqual(RESOURCE_INITIAL_STATE);
  });

  it('should handle FETCH', () => {
    const newState = volumeReducer(RESOURCE_INITIAL_STATE, {
      type: FETCH,
      payload: mockDataList
    });
    expect(newState).toEqual(mockFetchState);
  });

  it('should handle INSPECT', () => {
    const newState = volumeReducer(RESOURCE_INITIAL_STATE, {
      type: INSPECT,
      payload: mockInspectedData
    });
    expect(newState).toEqual(mockInspectState);
  });

  it('should handle PRUNE - remove', () => {
    const state = { inspected: {}, list: mockDataList };
    const newState = volumeReducer(state, {
      type: PRUNE,
      payload: ['a', 'b']
    });
    expect(newState).toEqual({ inspected: {}, list: [{ Id: '3', Name: 'c' }] });
  });

  it('should handle PRUNE - no remove', () => {
    const newState = volumeReducer(RESOURCE_INITIAL_STATE, {
      type: PRUNE,
      payload: []
    });
    expect(newState).toEqual(RESOURCE_INITIAL_STATE);
  });
});

describe('network reducer test', () => {
  const { FETCH, INSPECT, PRUNE } = NETWORK;
  it('should return the initial state', () => {
    expect(networkReducer(undefined, {})).toEqual(RESOURCE_INITIAL_STATE);
  });

  it('should handle FETCH', () => {
    const newState = networkReducer(RESOURCE_INITIAL_STATE, {
      type: FETCH,
      payload: mockDataList
    });
    expect(newState).toEqual(mockFetchState);
  });

  it('should handle INSPECT', () => {
    const newState = networkReducer(RESOURCE_INITIAL_STATE, {
      type: INSPECT,
      payload: mockInspectedData
    });
    expect(newState).toEqual(mockInspectState);
  });

  it('should handle PRUNE - remove', () => {
    const state = { inspected: {}, list: mockDataList };
    const newState = networkReducer(state, {
      type: PRUNE,
      payload: ['a', 'b']
    });
    expect(newState).toEqual({ inspected: {}, list: [{ Id: '3', Name: 'c' }] });
  });

  it('should handle PRUNE - no remove', () => {
    const newState = volumeReducer(RESOURCE_INITIAL_STATE, {
      type: PRUNE,
      payload: []
    });
    expect(newState).toEqual(RESOURCE_INITIAL_STATE);
  });
});

describe('container reducer test', () => {
  const { FETCH, INSPECT, PRUNE } = CONTAINER;
  it('should return the initial state', () => {
    expect(containerReducer(undefined, {})).toEqual(RESOURCE_INITIAL_STATE);
  });

  it('should handle FETCH', () => {
    const newState = containerReducer(RESOURCE_INITIAL_STATE, {
      type: FETCH,
      payload: mockDataList
    });
    expect(newState).toEqual(mockFetchState);
  });

  it('should handle INSPECT', () => {
    const newState = containerReducer(RESOURCE_INITIAL_STATE, {
      type: INSPECT,
      payload: mockInspectedData
    });
    expect(newState).toEqual(mockInspectState);
  });

  it('should handle PRUNE - remove', () => {
    const state = { inspected: {}, list: mockDataList };
    const newState = containerReducer(state, {
      type: PRUNE,
      payload: ['1', '2']
    });
    expect(newState).toEqual({ inspected: {}, list: [{ Id: '3', Name: 'c' }] });
  });

  it('should handle PRUNE - no remove', () => {
    const newState = volumeReducer(RESOURCE_INITIAL_STATE, {
      type: PRUNE,
      payload: []
    });
    expect(newState).toEqual(RESOURCE_INITIAL_STATE);
  });
});

describe('image reducer test', () => {
  const { FETCH, INSPECT, PRUNE, DELETE, TAG } = IMAGE;
  it('should return the initial state', () => {
    expect(imageReducer(undefined, {})).toEqual(RESOURCE_INITIAL_STATE);
  });

  it('should handle FETCH', () => {
    const newState = imageReducer(RESOURCE_INITIAL_STATE, {
      type: FETCH,
      payload: mockDataList
    });
    expect(newState).toEqual(mockFetchState);
  });

  it('should handle INSPECT', () => {
    const newState = imageReducer(RESOURCE_INITIAL_STATE, {
      type: INSPECT,
      payload: mockInspectedData
    });
    expect(newState).toEqual(mockInspectState);
  });

  it('should handle PRUNE/DELETE - remove', () => {
    const state = { inspected: {}, list: mockDataList };
    const mockNewState = { inspected: {}, list: [{ Id: '3', Name: 'c' }] };
    const newPruneState = imageReducer(state, {
      type: PRUNE,
      payload: [{ Deleted: '1' }, { Deleted: '2' }]
    });
    expect(newPruneState).toEqual(mockNewState);
    const newDeleteState = imageReducer(state, {
      type: DELETE,
      payload: [{ Deleted: '1' }, { Deleted: '2' }]
    });
    expect(newDeleteState).toEqual(mockNewState);
  });

  it('should handle PRUNE/DELETE - no remove', () => {
    const newPruneState = imageReducer(RESOURCE_INITIAL_STATE, {
      type: PRUNE,
      payload: []
    });
    expect(newPruneState).toEqual(RESOURCE_INITIAL_STATE);
    const newDeleteState = imageReducer(RESOURCE_INITIAL_STATE, {
      type: DELETE,
      payload: []
    });
    expect(newDeleteState).toEqual(RESOURCE_INITIAL_STATE);
  });
});

describe('common reducer test', () => {
  const { ERROR, CLEAR_ERROR } = COMMON;
  it('should return the initial state', () => {
    expect(commonReducer(undefined, {})).toEqual(ERROR_INITIAL_STATE);
  });
  it('should handle ERROR', () => {
    expect(
      commonReducer(ERROR_INITIAL_STATE, {
        type: ERROR,
        payload: 'error'
      })
    ).toEqual({ error: 'error' });
  });
  it('should handle CLEAR_ERROR', () => {
    expect(
      commonReducer(
        { error: 'error' },
        {
          type: CLEAR_ERROR
        }
      )
    ).toEqual(ERROR_INITIAL_STATE);
  });
});
