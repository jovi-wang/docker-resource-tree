import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Router, Route, Switch, MemoryRouter } from 'react-router-dom';

import Header from '../../components/Header';
import App from '../../components/App';
import HomePage from '../../components/HomePage';
import ImagesPage from '../../components/ImagesPage';
import ContainersPage from '../../components/ContainersPage';
import VolumesPage from '../../components/VolumesPage';
import NetworksPage from '../../components/NetworksPage';

Enzyme.configure({ adapter: new Adapter() });
const shallowWrapper = shallow(<App />);

describe('App components render all routes', () => {
  it('should render router', () => {
    expect(shallowWrapper.length).toEqual(1);
    expect(shallowWrapper.find(Router).length).toEqual(1);
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

describe('route to specific page', () => {
  it('should route to /', () => {
    const mountWrapper = mount(
      <MemoryRouter initialEntries={['/networks']}>
        <App />
      </MemoryRouter>
    );
    console.log(mountWrapper.find(VolumesPage).length);
    console.log(mountWrapper.find(HomePage).length);
    console.log(mountWrapper.find(ImagesPage).length);
    mountWrapper.unmount();
  });
});
