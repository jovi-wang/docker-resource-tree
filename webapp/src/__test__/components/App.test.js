import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter, push, routerMiddleware } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import configureMockStore from 'redux-mock-store';

import Header from '../../components/Header';
import App from '../../components/App';
import HomePage from '../../components/HomePage';
import ImagesPage from '../../components/ImagesPage';
import ContainersPage from '../../components/ContainersPage';
import VolumesPage from '../../components/VolumesPage';
import NetworksPage from '../../components/NetworksPage';

Enzyme.configure({ adapter: new Adapter() });

describe('App components render all routes', () => {
  const shallowWrapper = shallow(<App />);
  it('should render router', () => {
    expect(shallowWrapper.length).toEqual(1);
    expect(shallowWrapper.find(ConnectedRouter).length).toEqual(1);
    expect(shallowWrapper.find(Header).length).toEqual(1);
    expect(shallowWrapper.find(Switch).length).toEqual(1);
    expect(shallowWrapper.find(Route).length).toEqual(6);
    const pathMap = shallowWrapper.find(Route).reduce((acc, route) => {
      const { path, component } = route.props();
      acc[path] = component;
      return acc;
    }, {});
    expect(pathMap['/']).toBe(HomePage);
    expect(pathMap['/images/']).toBe(ImagesPage);
    expect(pathMap['/volumes/']).toBe(VolumesPage);
    expect(pathMap['/containers/']).toBe(ContainersPage);
    expect(pathMap['/networks/']).toBe(NetworksPage);
  });
});

// describe('route to specific page', () => {
//   let props;
//   let store;
//   let history;
//   // Reset history
//   history = createMemoryHistory();

//   // Mock props
//   props = {
//     action: 'PUSH',
//     location: {
//       pathname: '/path/to/somewhere'
//     },
//     history
//   };

//   // Mock store
//   const middlewares = [routerMiddleware];
//   const mockStore = configureMockStore([routerMiddleware]);
//   store = mockStore({
//     router: {
//       // action: 'PUSH',
//       // location: props.history.location
//       action: '',
//       location: {}
//     }
//   });
//   it('should route to /', () => {
//     const mountWrapper = mount(
//       <Provider store={store}>
//         <App history={history} />
//       </Provider>
//     );
//     store.dispatch({
//       type: "@@router/LOCATION_CHANGE",
//       payload: props
//     });
//     mountWrapper.update();
//     console.log(store.getActions());
//   });
// });
