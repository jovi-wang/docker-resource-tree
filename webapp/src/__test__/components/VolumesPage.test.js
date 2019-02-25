import React from 'react';
import { shallow } from 'enzyme';

import VolumesPage from '../../components/VolumesPage';

const enzymeWrapper = shallow(<VolumesPage />);

describe('components', () => {
  it('should render self and subcomponents', () => {
    expect(enzymeWrapper.length).toEqual(1);
    const button = enzymeWrapper.length;
  });

  // it('should call addTodo if length of text is greater than 0', () => {
  //   const { enzymeWrapper, props } = setup();
  //   const input = enzymeWrapper.find('TodoTextInput');
  //   input.props().onSave('');
  //   expect(props.addTodo.mock.calls.length).toBe(0);
  //   input.props().onSave('Use Redux');
  //   expect(props.addTodo.mock.calls.length).toBe(1);
  // });
});
