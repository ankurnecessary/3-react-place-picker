/* eslint linebreak-style: ["error", "windows"]*/
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

/**
 * A component to show the progress on a progress bar
 *
 * @component
 * @param {Object} prop
 * @param {number} timer - Maximum time for which progress bar will run
 * @return {JSX.Element}
 */
function ProgressBar({max}) {
  const [remainingTime, setRemainingTime] = useState(max);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return <progress max={max} value={remainingTime} />;
}

ProgressBar.propTypes = {
  max: PropTypes.number.isRequired,
};

export default ProgressBar;
