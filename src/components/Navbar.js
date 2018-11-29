import React, { Component } from "react";
import { Link } from "react-router-dom";

import M from "materialize-css";

const dropdownStyle = {
  textAlign: "center"
};

class Navbar extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.logout();
  };

  componentDidMount() {}

  componentDidUpdate() {
    var elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, {
      alignment: "right",
      coverTrigger: false,
      inDuration: 100,
      hover: true
    });
  }

  render() {
    return (
      <div>
        <ul id="dropdown1" className="dropdown-content">
          <li className="blue-grey darken-1" style={dropdownStyle}>
            <Link to="/" className="white-text">
              <span>Home</span>
            </Link>
          </li>
          <li className="blue-grey darken-1" style={dropdownStyle}>
            <Link to="/profile">
              <span className="white-text">Profile</span>
            </Link>
          </li>
          <li className="blue-grey darken-1" style={dropdownStyle}>
            <Link to="/" onClick={this.handleLogout}>
              <span className="white-text">Logout</span>
            </Link>
          </li>
        </ul>
        <nav className="blue-grey darken-3">
          <div className="container">
            <div className="nav-wrapper">
              <a className="brand-logo">HandyCap</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  {this.props.user ? (
                    <a className="dropdown-trigger" data-target="dropdown1">
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
