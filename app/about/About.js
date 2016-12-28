import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { loadAbout } from './actions';
import { getAbout } from './selectors';
import fetchData from 'lib/fetchData';
import { Card, CardContent, CardList, CardTitle, renderMarkdown } from 'styled';

@fetchData((state, dispatch) => dispatch(loadAbout()))
@connect((state) => ({ about: getAbout(state) }))
// eslint-disable-next-line react/prefer-stateless-function
export default class About extends React.Component {
  static propTypes = {
    about: PropTypes.any.isRequired,
  };

  render() {
    return (
      <CardList>
        <Card>
          <CardTitle>About this project:</CardTitle>
          <CardContent>
            {renderMarkdown(this.props.about)}
          </CardContent>
        </Card>
      </CardList>
    );
  }
}
