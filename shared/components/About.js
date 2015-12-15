import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';

import { getAbout }         from 'actions/AboutActions';
import fetchData            from 'lib/fetchDataDeferred';

@fetchData((state, dispatch, params) => dispatch(getAbout()))
@connect(state => ({about: state.about}))
export default class About extends React.Component {
  static propTypes = {
    about: PropTypes.any.isRequired,
  };

  render() {
    return (
      <div className="about" dangerouslySetInnerHTML={{__html: this.props.about}} />
    );
  }
}
