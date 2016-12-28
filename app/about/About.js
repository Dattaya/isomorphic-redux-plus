import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { loadAbout } from './actions';
import { getAbout } from './selectors';
import fetchData from 'lib/fetchData';

import kitten from './kitten.jpg';

/* eslint-disable react/prefer-stateless-function */
@fetchData((state, dispatch) => dispatch(loadAbout()))
@connect((state) => ({ about: getAbout(state) }))
export default class About extends React.Component {
  static propTypes = {
    about: PropTypes.any.isRequired,
  };

  state = {
    showKitten: false,
  }

  handleToggleKitten = () => this.setState({ showKitten: !this.state.showKitten });

  render() {
    const { showKitten } = this.state;
    return (
      <div>
        <div className="about" dangerouslySetInnerHTML={{ __html: this.props.about }} />

        <h4>Psst! Would you like to see a kitten?</h4>
        <p>
          <button
            style={{ marginLeft: 50 }}
            onClick={this.handleToggleKitten}
          >
            {showKitten ? 'No! Take it away!' : 'Yes! Please!'}
          </button>
        </p>

        {showKitten && <div><img src={kitten} alt="kitten" /></div>}
      </div>
    );
  }
}
