import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import NewUserForm from './NewUserForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/Home');
  }

  async logout() {
    this.props.auth.logout('/');
  }

  render() {
    const login = this.state.authenticated ?
    <button onClick={this.logout}>Logout</button> :
    <button onClick={this.login}>Login</button>;

    if (this.state.authenticated === null) return null;
    return (
      <div>
        <NewUserForm/>
        {login}
      </div>
    )
  }
};

export default withAuth(Login);
