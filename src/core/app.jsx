import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

import { Loading } from '../components/loading/loading.jsx';
import { ErrorComponentWrapper } from '../components/error/error.jsx';

import './css/reset';
import './css/fonts';
import './css/global';
import classes from './app.css';

export class AppComponent extends Component {

  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(value) {
    this.props.fetchDocuments(value);
  }

  render() {
    const {
      children,
      loadingFailed,
      loadingInProgress,
      errorMsg,
    } = this.props;

    return (
      <div className={classes.app}>
        {React.cloneElement(children, {someProps: '???'})}
        <Loading show={ loadingInProgress } />
        <ErrorComponentWrapper show={ loadingFailed } msg={ errorMsg } />
      </div>
    );
  }
}

AppComponent.propTypes = {
  children: PropTypes.object,
  errorMsg: PropTypes.string,
  loadingInProgress: PropTypes.bool,
  loadingFailed: PropTypes.bool,
};

function mapStateToProps(state) {
  const loading = state.appStates.get('loading');
  const loadingInProgress = loading.get('inProgress');
  const loadingFailed = loading.get('hasFailed');
  const errorMsg = loading.get('msg');

  return {
    loadingInProgress,
    loadingFailed,
  };
}

export const App = connect(
  (state) => mapStateToProps(state),
  {  }
)(AppComponent);
