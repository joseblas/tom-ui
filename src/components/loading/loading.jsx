import React from 'react';
import PropTypes from 'prop-types';

import classes from './loading.css';

export const Loading = ({ show }) => {
  const className = show ? classes.loading : classes.loadingHidden;
  return (
    <div className={ className }>
      <span className={ classes.loadingText }>LOADING!</span>
    </div>
  );
};

Loading.propTypes = {
  show: PropTypes.bool,
};
