import axios from "axios";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Navbar from "./Navbar";
import Profile from "./Profile";
import Register from "./Register";

import "../css/materialize.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: null,
      userFirstName: null,
      tokenChecked: false
    };
    this.checkToken = this.checkToken.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  checkToken() {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      axios
        .post("/api/verify", {
          token: authToken
        })
        .then(response => {
          this.setState({
            tokenChecked: true
          });
          if (response.data.decoded) {
            this.setState({
              userID: response.data.decoded.userID,
              userFirstName: response.data.decoded.firstName
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({
        tokenChecked: true
      });
    }
  }

  componentDidMount() {
    this.checkToken();
  }

  updateUser(userID, userFirstName) {
    this.setState({
      userID: userID,
      userFirstName: userFirstName
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar user={this.state.userFirstName} />
          <Route
            exact
            path="/"
            render={props => (
              <Home
                user={this.state.userID}
                updateUser={this.updateUser}
                tokenChecked={this.state.tokenChecked}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/profile"
            render={props => (
              <Profile user={this.state.userFirstName} {...props} />
            )}
          />
          <Route
            exact
            path="/register"
            render={props => (
              <Register updateUser={this.updateUser} {...props} />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
