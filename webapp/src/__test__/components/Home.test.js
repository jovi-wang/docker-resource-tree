import React from 'react';
import { shallow } from 'enzyme';

import { Link } from 'react-router-dom';
import HomePage from '../../components/HomePage';

const enzymeWrapper = shallow(<HomePage />);

describe('HomePage components', () => {
  it('should render static html', () => {
    expect(enzymeWrapper.find(Link).length).toBe(4);
    expect(
      enzymeWrapper.matchesElement(
        <div className='ui'>
          <div className='ui medium header'>display local docker demon resources</div>
          <div className='ui list content'>
            <Link to='/containers' className='item'>
              Containers
            </Link>
            <Link to='/images' className='item'>
              Images
            </Link>
            <Link to='/volumes' className='item'>
              Volumes
            </Link>
            <Link to='/networks' className='item'>
              Networks
            </Link>
          </div>
        </div>
      )
    ).toBe(true);
  });
});
