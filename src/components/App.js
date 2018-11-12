import axios from "axios";
import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import AddScore from "./AddScore";
import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
import PrivateRoute from "./PrivateRoute";
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
    this.logout = this.logout.bind(this);
  }

  checkToken() {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      axios
        .post("/api/verifyStoredToken", {
          token: authToken
        })
        .then(response => {
          if (response.data.decoded) {
            this.setState({
              userID: response.data.decoded.userID,
              userFirstName: response.data.decoded.firstName,
              tokenChecked: true
            });
          } else {
            this.setState({ tokenChecked: true });
            localStorage.removeItem("authToken");
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

  updateUser(userID, userFirstName) {
    this.setState({
      userID: userID,
      userFirstName: userFirstName
    });
  }

  logout() {
    localStorage.removeItem("authToken");
    this.updateUser(null, null);
    this.props.history.push("/");
  }

  componentDidMount() {
    this.checkToken();
  }

  render() {
    return (
      <div>
        <Navbar user={this.state.userFirstName} logout={this.logout} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/login"
            render={props => (
              <Login
                user={this.state.userID}
                tokenChecked={this.state.tokenChecked}
                updateUser={this.updateUser}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/register"
            render={props => (
              <Register
                user={this.state.userID}
                updateUser={this.updateUser}
                {...props}
              />
            )}
          />
          {/*Protected Routes for Authenticated Users*/}
          <PrivateRoute
            exact
            path="/profile"
            component={Profile}
            user={this.state.userID}
          />
          <PrivateRoute
            exact
            path="/addscore"
            component={AddScore}
            user={this.state.userID}
          />
        </Switch>
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);

export default AppWithRouter;
