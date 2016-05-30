import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';

import { loadAbout }        from 'redux/actions/AboutActions';
import { selectAbout }      from 'redux/reducers/AboutReducer';
import fetchData            from 'lib/fetchDataDeferred';

/* eslint-disable react/prefer-stateless-function */
@fetchData((state, dispatch) => dispatch(loadAbout()))
@connect(state => ({ about: selectAbout(state) }))
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
