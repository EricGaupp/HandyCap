import React, { Component } from "react";
import { Link } from "react-router-dom";

const $ = window.jQuery;

class Navbar extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.logout();
  };

  componentDidMount() {
    if (this.props.user) {
      $(document).ready(function() {
        $(".dropdown-button").dropdown({
          inDuration: 300,
          outDuration: 225,
          constrainWidth: false, // Does not change width of dropdown to that of the activator
          hover: true, // Activate on hover
          gutter: 0, // Spacing from edge
          belowOrigin: true, // Displays dropdown below the button
          alignment: "right", // Displays dropdown with edge aligned to the left of button
          stopPropagation: false // Stops event propagation
        });
      });
    }
  }

  componentDidUpdate() {
    $(".dropdown-button").dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: "right", // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });
  }

  render() {
    return (
      <div>
        <ul id="dropdown1" className="dropdown-content">
          <li className="blue-grey darken-1">
            <Link to="/" className="white-text">
              <span>Home</span>
            </Link>
          </li>
          <li className="blue-grey darken-1">
            <Link to="/profile">
              <span className="white-text">Profile</span>
            </Link>
          </li>
          <li className="blue-grey darken-1">
            <Link to="/addscore">
              <span className="white-text">Post Score</span>
            </Link>
          </li>
          <li className="blue-grey darken-1">
            <Link to="/">
              <span className="white-text" onClick={this.handleLogout}>
                Logout
              </span>
            </Link>
          </li>
        </ul>
        <nav>
          <div className="container">
            <div className="nav-wrapper">
              <a className="brand-logo">HandyCap</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  {this.props.user ? (
                    <a className="dropdown-button" data-activates="dropdown1">
                      Welcome, {this.props.user}!
                      <i className="material-icons right">arrow_drop_down</i>
                    </a>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
