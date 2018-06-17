import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const apiUrl = process.env.REACT_APP_API_SERVER;
const wallet = require('../../wallet');

class NewUserForm extends Component {
  state={email:'',password:'',status:''}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSignUp = async() =>{
    const account = await wallet.makeNewAccount();
    const keystore = await wallet.makeKeystore(account.privateKey,this.state.password);
    this.setState({status:'creating account...'})
    const res = await fetch(apiUrl+'/users',{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profile:{
          email:this.state.email,
          login:this.state.email,
          ethAddress:account.address,
          encryptedSk:keystore
        },
        credentials:{
          password:this.state.password
        }
      })
    })
    if(!res.ok){
      const json = await res.json();
      console.log(json.error);
    }else{
      const json = await res.json();
      console.log(json.data);
      this.setState({status:'account created'})
    }
  }


  render() {
    return (
      <div style={{display:'flex',flexDirection:'column',width:'300px'}}>
        <TextField id='email' label='Email' value={this.state.email} onChange={this.handleChange('email')} margin='normal'/>
        <TextField id='password' label='Password' value={this.state.password} onChange={this.handleChange('password')} margin='normal'/>
        <Button variant='contained' color='primary' onClick={this.handleSignUp}>Sign Up</Button>
        <p>{this.state.status}</p>
      </div>
    );
  }
};

export default withAuth(NewUserForm);
