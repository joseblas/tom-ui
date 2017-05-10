import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import PropTypes from 'prop-types';

import classes from './root.css';

export default class RootScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <main className={ classes.main }>
        <div className="wrapper">
          Yo yo, Whasssssssup!??
        </div>
      </main>
    );
  }
}

RootScreen.propTypes = {
  handleFormSubmit: PropTypes.func,
  docs: PropTypes.array,
};
