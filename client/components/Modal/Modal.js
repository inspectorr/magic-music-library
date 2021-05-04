import React, {useContext} from 'react';
import {ModalContext} from './ModalProvider';
import cn from 'classnames';

function Modal({
  size = 'sm',
  children,
  className,
  hideCross
}) {
  const { hideModal } = useContext(ModalContext);
  
  return (
    <div className={cn('modal-container', className)}>
      <div className={`modal modal--${size} card card--full`}>
        {!hideCross && (
          <div
            className="modal__cross-icon"
            onClick={hideModal}
          >
            X
            {/*<Cross/>*/}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default Modal;
