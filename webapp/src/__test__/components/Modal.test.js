import React from 'react';
import { mount } from 'enzyme';
import Modal from '../../components/Modal';

describe('Modal component', () => {
  const Child = () => <div>content</div>;
  let component;
  // add a div with #modal id to the global body
  const modalRoot = global.document.createElement('div');
  modalRoot.setAttribute('id', 'modal');
  const body = global.document.querySelector('body');
  body.appendChild(modalRoot);

  afterEach(() => {
    component.unmount();
  });

  it('renders without crashing', () => {
    component = mount(
      <Modal title='modal title' content='modal content' actions='modal actions'>
        <Child />
      </Modal>
    );
    expect(component.contains(Child)).toBeTruthy();
    expect(component.props().title).toEqual('modal title');
    expect(component.props().content).toEqual('modal content');
    expect(component.props().actions).toEqual('modal actions');
  });
});
