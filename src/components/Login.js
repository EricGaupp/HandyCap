import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import '../css/materialize.css';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			emailValue: '',
			passwordValue: ''
		}

		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleEmailChange(event){
		this.setState({
			emailValue: event.target.value
		});
	}

	handlePasswordChange(event){
		this.setState({
			passwordValue: event.target.value
		});
	}

	handleLogin(event){
		event.preventDefault();
		axios.post('/api/login', {
			email: this.state.emailValue,
			password: this.state.passwordValue
		})
		.then(response => {
			this.props.updateUser(response.data.user.id, response.data.user.firstName, response.data.user.lastName);
			localStorage.setItem('authToken', response.data.token);
		})
		.catch(error => {
			console.log(error);
		})
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<form className="col s12 m6 offset-m3">
						<div className="card blue-grey darken-1">
							<div className="card-content white-text">
								<span className="card-title">Login</span>
								<div className="row">
									<div className="input-field col s12">
										<input id="loginEmail" type="email" className="validate"  value={this.state.emailValue} onChange={this.handleEmailChange} />
										<label htmlFor="loginEmail">Email</label>
									</div>
								</div>
								<div className="row">
									<div className="input-field col s12">
										<input id="loginPassword" type="password"  value={this.state.passwordValue} onChange={this.handlePasswordChange} />
										<label htmlFor="loginPassword">Password</label>
										<button className="btn waves-effect waves-light right" onClick={this.handleLogin}>Submit<i className="material-icons right">send</i></button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;