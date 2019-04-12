import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore, { history } from './configureStore';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

export const Root = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
ReactDOM.render(
  <Root>
    <App history={history} />
  </Root>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
