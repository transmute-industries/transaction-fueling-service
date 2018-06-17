import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Action extends Component {
  state={data:''};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <div style={{display:'flex',flexDirection:'column',width:'300px'}}>
        <p>{this.props.title}</p>
        <TextField id={this.props.title} label={this.props.label} value={this.state.data} onChange={this.handleChange('data')} margin='normal'/>
        <Button variant='contained' color='primary' onClick={()=>this.props.handleClick(this.state.data)}>{this.props.buttonText}</Button>
      </div>
    );
  }
};

export default withAuth(Action);
