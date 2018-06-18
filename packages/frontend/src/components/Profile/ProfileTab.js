import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
const wallet = require('../../wallet');

class ProfileTab extends Component {
  state = {symbol:'',totalSupply:'',balance:''}

  componentDidMount = async() =>{
    const symbol = await wallet.getSymbol();
    const totalSupply = await wallet.getTotalSupply();
    this.setState({symbol:symbol,totalSupply:totalSupply});
  }

  render() {
    const email = this.props.user ? <p>{this.props.user.email}</p> : <p></p>
    return (
      <div>
        <p>Profile</p>
        {email}
        <p style={{marginTop:'50px'}}>Contract</p>
        <p>{this.state.symbol}</p>
        <p>{this.state.totalSupply}</p>
        <p>{this.state.balance}</p>
      </div>
    );
  }
};

export default withAuth(ProfileTab);
