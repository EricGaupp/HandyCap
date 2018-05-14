import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom'

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
  }

  componentDidMount(){
  {/*Check for JWT, authentiate and update state.userID if valid*/}
  }

  render() {
  	return (
    	<Router>
    		<div>
    			<Navbar user={this.state.userID}/>
    			<Route exact path="/" component={Home} />
    			<Route exact path="/login" component={Login} />
    			<Route exact path="/profile" component={Profile} />
    		</div>
    	</Router>
    );
  }
}

export default App;
