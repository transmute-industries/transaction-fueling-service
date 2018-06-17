import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ActionsTab from '../Actions/ActionsTab';
import ProfileTab from '../Profile/ProfileTab';

class Home extends Component {
  state = {value:0,user:null}

  componentDidMount = async() =>{
    const user = await this.props.auth.getUser()
    console.log(user)
    this.setState({user:user});
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const {value} = this.state;
    return (
      <div>
        <Tabs value={value} onChange={this.handleChange}>
          <Tab label='Actions'/>
          <Tab label='Profile'/>
        </Tabs>
        {value === 0 && <ActionsTab user={this.state.user}/>}
        {value === 1 && <ProfileTab user={this.state.user}/>}
      </div>
    );
  }
};

export default withAuth(Home);
