import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Transfer extends Component {
  state={address:'',value:''};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <div style={{display:'flex',flexDirection:'column',width:'300px'}}>
        <p>Transfer</p>
        <TextField id='address' label='External ETH Address' value={this.state.address} onChange={this.handleChange('address')} margin='normal'/>
        <TextField id='value' label='Tokens to Transfer' value={this.state.value} onChange={this.handleChange('value')} margin='normal'/>
        <Button variant='contained' color='primary' onClick={()=>this.props.handleClick(this.state.address,this.state.value)}>Transfer</Button>
      </div>
    );
  }
};

export default withAuth(Transfer);
