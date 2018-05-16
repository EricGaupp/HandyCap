import React, { Component } from 'react';
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
		this.handleRegister = this.handleRegister.bind(this);
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
		console.log("Logging In!");
		axios.post('/api/login', {
			username: this.state.emailValue,
			password: this.state.passwordValue
		})
		.then(response => {
			console.log(response);
		})
		.catch(error => {
			console.log(error);
		})
	}

	handleRegister(event){
		event.preventDefault();
		console.log("Registering!");
		axios.post('/api/register', {
			username: this.state.emailValue,
			password: this.state.passwordValue
		})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
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
										<input id="email" type="email" className="validate"  value={this.state.emailValue} onChange={this.handleEmailChange} />
										<label htmlFor="email">Email</label>
									</div>
								</div>
								<div className="row">
									<div className="input-field col s12">
										<input id="password" type="password"  value={this.state.passwordValue} onChange={this.handlePasswordChange} />
										<label htmlFor="password">Password</label>
										<button className="btn-flat waves-effect waves-light" onClick={this.handleLogin}>Submit<i className="material-icons right">send</i></button>
										<button className="btn waves-effect waves-light right" onClick={this.handleRegister}>Register<i className="material-icons right">send</i></button>
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