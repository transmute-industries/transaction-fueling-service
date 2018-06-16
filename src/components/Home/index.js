import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p>We should be authenticated here.</p>
    );
  }
};

export default withAuth(Home);