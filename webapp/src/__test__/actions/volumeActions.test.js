import * as actions from '../../actions/volumeActions';
import { ABC, FETCH } from '../../constant';
import { createBrowserHistory } from 'history';
import configureMockStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import dockerAPI from '../../dockerAPI';

jest.mock('../../dockerAPI');
afterAll(() => {
  jest.clearAllMocks();
});
describe('test volume actions', () => {
  it('should return abc', () => {
    const expectedAction = {
      type: ABC,
      payload: 'abc'
    };
    expect(actions.saveComment()).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  const middlewares = [reduxThunk];
  const mockStore = configureMockStore(middlewares);

  it('fetch volumes', async () => {
    const expectedActions = [
      {
        type: FETCH,
        payload: '123'
      }
    ];
    const store = mockStore({ volumes: [] });
    store.clearActions();

    dockerAPI.get.mockResolvedValue({ data: '123' });
    await store.dispatch(actions.fetchStreams());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
