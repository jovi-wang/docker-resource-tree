import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import networkReducer from './networkReducer';
import imageReducer from './imageReducer';
import containerReducer from './containerReducer';
import volumeReducer from './volumeReducer';
import commonReducer from './commonReducer';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    network: networkReducer,
    image: imageReducer,
    container: containerReducer,
    volume: volumeReducer,
    common: commonReducer
  });
