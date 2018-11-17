import axios from "axios";
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import "materialize-css/dist/css/materialize.min.css";

import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
import PrivateRoute from "./PrivateRoute";
import Profile from "./Profile";
import Register from "./Register";
import Spinner from "./Spinner";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenChecked: false,
      authToken: null,
      userID: null,
      userFirstName: null,
      userScores: null
    };
  }

  checkToken = () => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      this.setState({ authToken: authToken });
      axios
        .post("/verifyStoredToken", {
          token: authToken
        })
        .then(response => {
          if (response.data.decoded) {
            const { userID, firstName } = response.data.decoded;
            this.setState(
              {
                tokenChecked: true
              },
              () => {
                this.updateUser(userID, firstName, authToken);
              }
            );
          } else {
            this.setState({ tokenChecked: true }, () => {
              localStorage.removeItem("authToken");
            });
          }
        })
        .catch(error => {
          throw error;
        });
    } else {
      this.setState({
        tokenChecked: true
      });
    }
  };

  getScores = () => {
    const authToken = this.state.authToken;
    if (authToken) {
      axios
        .get("/api/getScores", {
          headers: { authorization: `Bearer ${authToken}` }
        })
        .then(response => {
          this.setState({ userScores: response.data });
        });
    }
  };

  logout = () => {
    localStorage.removeItem("authToken");
    this.setState({
      userID: null,
      userFirstName: null,
      userScores: null,
      authToken: null
    });
    this.props.history.push("/");
  };

  updateUser = (userID, userFirstName, authToken) => {
    this.setState(
      {
        userID: userID,
        userFirstName: userFirstName,
        authToken: authToken
      },
      () => {
        this.getScores();
      }
    );
  };

  componentDidMount() {
    this.checkToken();
  }

  render() {
    return (
      <div>
        <Navbar user={this.state.userFirstName} logout={this.logout} />
        {!this.state.tokenChecked ? (
          <Spinner />
        ) : (
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
              component={Profile}
              path="/profile"
              scores={this.state.userScores}
              user={this.state.userFirstName}
            />
            <Redirect to="/" />
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
