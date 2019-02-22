import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import reduxThunk from 'redux-thunk';

import { createBrowserHistory } from 'history';
import reduxLogger from 'redux-logger';

import createRootReducer from './reducers';

export const history = createBrowserHistory();

export default (preLoadedState) =>
  createStore(
    createRootReducer(history), // root reducer with router state
    preLoadedState,
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      reduxThunk,
      reduxLogger
    )
  );
