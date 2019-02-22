import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Link } from 'react-router-dom';
import Header from '../../components/Header';

Enzyme.configure({ adapter: new Adapter() });
const enzymeWrapper = shallow(<Header />);

describe('Header components', () => {
  it('should render all links', () => {
    expect(enzymeWrapper.length).toEqual(1);
    expect(enzymeWrapper.find(Link).length).toEqual(5);
    const linkLists = [
      { to: '/', className: 'item', children: 'Home', replace: false },
      { to: '/containers', className: 'item', children: 'Containers', replace: false },
      { to: '/images', className: 'item', children: 'Images', replace: false },
      { to: '/volumes', className: 'item', children: 'Volumes', replace: false },
      { to: '/networks', className: 'item', children: 'Networks', replace: false }
    ];
    for (let i = 0; i < 5; i += 1) {
      const linkComponent = enzymeWrapper.find(Link).get(i).props;
      expect(linkComponent).toEqual(linkLists[i]);
    }
  });
});
