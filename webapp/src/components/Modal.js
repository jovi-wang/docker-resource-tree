import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className='ui dimmer modals visible active'>
      <div onClick={(e) => e.stopPropagation()} className='ui standard modal visible active'>
        <div className='header'>sdas</div>
        <div className='content'>{`{ name: 'asd' }`}</div>
        <div className='actions'>454543</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
