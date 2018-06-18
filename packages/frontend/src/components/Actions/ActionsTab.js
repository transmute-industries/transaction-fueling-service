import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import Action from './Action';
import Transfer from './Transfer';

const wallet = require('../../wallet');

class ActionsTab extends Component {
  state={userAddress:'',privateKey:'',txHash:''};

  componentDidMount = async() =>{

  }

  earn = async(value)=>{

  }

  redeem = async(value)=>{
    const txHash = await wallet.burn(this.state.userAddress,value,this.state.privateKey);
    this.setState({txHash:txHash});
  }

  transfer = async(address,value)=>{
    const txHash = await wallet.transfer(this.state.userAddress,address,value,this.state.privateKey);
    this.setState({txHash:txHash});
  }

  render() {

    return (
      <div>
        <Action title='Earn' label='Tokens Earned' handleClick={this.earn} buttonText='Earn'/>
        <Action title='Redeem' label='Tokens to Redeeem' handleClick={this.redeem} buttonText='Redeem'/>
        <Transfer handleClick={this.transfer}/>
      </div>
    );
  }
};

export default withAuth(ActionsTab);
