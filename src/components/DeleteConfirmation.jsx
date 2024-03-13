import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

const TIMER = 3000;
/**
 * A custom React component that displays delete message in modal window.
 *
 * @component
 * @param {Object} props - The props object containing component's properties.
 * @param {function} props.onConfirm - Called when user confirms the deletion
 * @param {function} props.onCancel - Called when the user cancels the deletion
 * @return {JSX.Element} A JSX element representing Delete confirmation message.
 */
function DeleteConfirmation({onConfirm, onCancel}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

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
      <ProgressBar max={TIMER} />
    </div>
  );
}

DeleteConfirmation.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteConfirmation;
