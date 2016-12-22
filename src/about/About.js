import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { loadAbout } from './actions';
import { getAbout } from './selectors';
import fetchData from 'lib/fetchData';

/* eslint-disable react/prefer-stateless-function */
@fetchData((state, dispatch) => dispatch(loadAbout()))
@connect((state) => ({ about: getAbout(state) }))
export default class About extends React.Component {
  static propTypes = {
    about: PropTypes.any.isRequired,
  };

  render() {
    return (
      <div className="about" dangerouslySetInnerHTML={{ __html: this.props.about }} />
    );
  }
}
