import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import VolumesPage from '../../components/VolumesPage';

Enzyme.configure({ adapter: new Adapter() });
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
