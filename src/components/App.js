import axios from 'axios';
import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Navbar from './Navbar';
import Profile from './Profile';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userID: null
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
          userID: response.data.decoded.user
        });
      }
    }).catch(error => {
      console.log(error);
    })
  }

  componentDidMount(){
    const authToken = localStorage.getItem("authToken");
    this.setState({authToken: authToken});
    this.checkToken(authToken);
  }

  updateUser(user){
    this.setState({
      userID: user
    });
  }

  render() {
  	return (
    	<Router>
    		<div>
    			<Navbar user={this.state.userID} />
    			<Route exact path="/" component={Home} />
    			<Route exact path="/login" render={()=><Login updateUser={this.updateUser} />} />
    			<Route exact path="/profile" component={Profile} />
    		</div>
    	</Router>
    );
  }
}

export default App;
