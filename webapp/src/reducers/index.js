import { combineReducers } from 'redux';
import networkReducer from './networkReducer';
import imageReducer from './imageReducer';
import containerReducer from './containerReducer';
import volumeReducer from './volumeReducer';

export default combineReducers({
  network: networkReducer,
  image: imageReducer,
  container: containerReducer,
  volume: volumeReducer
});
