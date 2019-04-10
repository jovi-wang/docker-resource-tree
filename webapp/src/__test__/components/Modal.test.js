import React from 'react';
import { mount } from 'enzyme';
import Modal from '../../components/Modal';

const Child = () => <div>Yolo</div>;

// add a div with #modal id to the global body
const modalRoot = global.document.createElement('div');
modalRoot.setAttribute('id', 'modal');
const body = global.document.querySelector('body');
body.appendChild(modalRoot);

it('renders without crashing', () => {
  const component = mount(
    <Modal>
      <Child />
    </Modal>
  );
});
