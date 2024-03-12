import React from 'react';
import {useEffect} from 'react';
import PropTypes from 'prop-types';

/**
 * A custom React component that displays delete message in modal window.
 *
 * @component
 * @param {object} props - The props object containing component's properties.
 * @return {JSX.Element} A JSX element representing Delete confirmation message.
 */
function DeleteConfirmation({onConfirm, onCancel}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}

DeleteConfirmation.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteConfirmation;
