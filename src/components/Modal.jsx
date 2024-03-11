import React, {useEffect} from 'react';
import {useRef} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';

/**
 * A custom React component that displays modal window.
 *
 * @component
 * @param {object} props - The props object containing component's properties.
 * @param {JSX.Element} props.children - Children of the component.
 * @return {JSX.Element} A JSX element representing the Modal window.
 */
function Modal({children, open, onClose}) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
      <dialog className="modal" ref={dialog} onClose={onClose}>
        {children}
      </dialog>,
      document.getElementById('modal'),
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
