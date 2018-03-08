import React, { Component } from 'react';
import '../css/materialize.css';
import { Redirect } from 'react-router-dom';

class Profile extends Component {
  render() {
    return (
    	<div className="container">
    		{this.props.userID ? <Redirect to="/" /> : <a>Profile</a>}
		</div>
    );
  }
}

export default Profile;