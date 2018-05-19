import axios from 'axios';
import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route, Link
} from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Navbar from './Navbar';
import Profile from './Profile';
import Register from './Register';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userID: null,
      userFirstName: null
    }
    this.checkToken = this.checkToken.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  checkToken(token){
    axios.post('/api/verify', {
      token: token
    }).then(response =>{
      if (response.data.decoded){
        this.setState({
          userID: response.data.decoded.userID,
          userFirstName: response.data.decoded.firstName
        });
      }
    }).catch(error => {
      console.log(error);
    })
  }

  componentDidMount(){
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      this.checkToken(authToken);
    }
  }

  updateUser(userID, userFirstName, userLastName){
    this.setState({
      userID: userID,
      userFirstName: userFirstName,
      userLastName: userLastName
    });
  }

  render() {
  	return (
    	<Router>
    		<div>
    			<Navbar user={this.state.userFirstName} />
    			<Route exact path="/" component={Home} />
    			<Route path="/login" render={()=><Login updateUser={this.updateUser} />} />
          <Route path="/register" component={Register} />
    			<Route path="/profile" component={Profile} />
    		</div>
    	</Router>
    );
  }
}

export default App;
