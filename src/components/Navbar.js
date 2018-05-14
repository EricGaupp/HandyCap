import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import '../css/materialize.css';

const $ = window.jQuery;

class Navbar extends Component {
  componentDidMount(){
    if (this.props.user){
      $(document).ready(function(){
        $(".dropdown-button").dropdown({
          inDuration: 300,
          outDuration: 225,
          constrainWidth: false, // Does not change width of dropdown to that of the activator
          hover: true, // Activate on hover
          gutter: 0, // Spacing from edge
          belowOrigin: true, // Displays dropdown below the button
          alignment: 'right', // Displays dropdown with edge aligned to the left of button
          stopPropagation: false // Stops event propagation
        });
      });
    }
  }

  componentDidUpdate(){
    $(".dropdown-button").dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'right', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
    });
  }

  render() {
    return (
      <div>
      <ul id="dropdown1" className="dropdown-content">
        <li className="blue-grey darken-1"><NavLink to="/"><span className="white-text">Home</span></NavLink></li>
        <li className="blue-grey darken-1"><NavLink to="/profile"><span className="white-text">Profile</span></NavLink></li>
      </ul>
		  <nav>
        <div className="container">
    		  <div className="nav-wrapper">
      		  <a className="brand-logo">HandyCap</a>
      		  <ul id="nav-mobile" className="right hide-on-med-and-down">
        	    <li>{this.props.user ? 
                (<a className="dropdown-button" data-activates="dropdown1">Welcome, {this.props.user}!<i className="material-icons right">arrow_drop_down</i></a>) : <NavLink to='/login'>Login</NavLink>}</li>
      	  	</ul>
    		  </div>
        </div>
  		</nav>
      </div>
    );
  }
}

export default Navbar;