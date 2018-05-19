import React, { Component } from 'react';
import axios from 'axios';
import '../css/materialize.css';

class Register extends Component {
	constructor(props){
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			emailValue: '',
			passwordValue: ''
		}

		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
	}

	handleFirstNameChange(event){
		this.setState({
			firstName: event.target.value
		});
	}

	handleLastNameChange(event){
		this.setState({
			lastName: event.target.value
		});
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

	handleRegister(event){
		event.preventDefault();
		axios.post('/api/register', {
			email: this.state.emailValue,
			password: this.state.passwordValue,
			firstName: this.state.firstName,
			lastName: this.state.lastName
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
								<span className="card-title">Register</span>
								<div className="row">
									<div className="input-field col s12">
										<input id="firstName" type="text" className="validate"  value={this.state.firstName} onChange={this.handleFirstNameChange} />
										<label htmlFor="firstName">First Name</label>
									</div>
								</div>
								<div className="row">
									<div className="input-field col s12">
										<input id="lastName" type="text" className="validate"  value={this.state.lastName} onChange={this.handleLastNameChange} />
										<label htmlFor="lastName">Last Name</label>
									</div>
								</div>
								<div className="row">
									<div className="input-field col s12">
										<input id="registerEmail" type="email" className="validate"  value={this.state.emailValue} onChange={this.handleEmailChange} />
										<label htmlFor="registerEmail">Email</label>
									</div>
								</div>
								<div className="row">
									<div className="input-field col s12">
										<input id="registerPassword" type="password"  value={this.state.passwordValue} onChange={this.handlePasswordChange} />
										<label htmlFor="registerPassword">Password</label>
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

export default Register;