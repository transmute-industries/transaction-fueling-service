import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Security, ImplicitCallback, Auth, SecureRoute } from '@okta/okta-react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import config from './config';
import theme from './theme';

import Home from './components/Home';
import Login from './components/Login';

console.log('config: ', config);
console.log('process.env.REACT_APP_OKTA_URL: ', process.env.REACT_APP_OKTA_URL);
const auth = new Auth({
  issuer: config.issuer,
  client_id: config.client_id,
  redirect_uri: config.redirect_uri
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Security auth={auth}>
            <Switch>
              <Route path='/' exact={true} component={Login} />
              <Route path='/implicit/callback' component={ImplicitCallback} />
              <SecureRoute path="/home" exact render={() => <Home />} />
            </Switch>
          </Security>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
