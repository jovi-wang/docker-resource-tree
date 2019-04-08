import React from 'react';
import ReactDOM from 'react-dom';
import ReactJson from 'react-json-view';

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className='ui dimmer modals visible active'>
      <div onClick={(e) => e.stopPropagation()} className='ui standard modal visible active'>
        <div className='header'>{props.title}</div>
        <div className='content'>
          <ReactJson src={{ name: 'abc', age: [{ a: 1, b: 2 }] }} enableClipboard={false} />
        </div>
        <div className='actions'>454543</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
