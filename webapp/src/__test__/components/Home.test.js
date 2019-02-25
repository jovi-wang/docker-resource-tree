import React from 'react';
import { shallow } from 'enzyme';

import HomePage from '../../components/HomePage';

const enzymeWrapper = shallow(<HomePage />);

describe('HomePage components', () => {
  it('should render static html', () => {
    expect(
      enzymeWrapper.matchesElement(
        <div className='ui'>
          <div className='ui medium header'>display local docker demon resources</div>
          <div className='ui list content'>
            <div className='item'>Containers</div>
            <div className='item'>Images</div>
            <div className='item'>Volumes</div>
            <div className='item'>Networks</div>
          </div>
        </div>
      )
    ).toBe(true);
  });
});
