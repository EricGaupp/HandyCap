import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import Spinner from "./Spinner";

const loginButtonStyle = {
	width: "100%"
};

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailValue: "",
			passwordValue: ""
		};
	}

	handleEmailChange = event => {
		this.setState({
			emailValue: event.target.value.toLowerCase()
		});
	};

	handlePasswordChange = event => {
		this.setState({
			passwordValue: event.target.value
		});
	};

	handleLogin = event => {
		event.preventDefault();
		axios
			.post("/login", {
				email: this.state.emailValue,
				password: this.state.passwordValue
			})
			.then(response => {
				const { userID, firstName } = response.data.user;
				if (response.data.user.userID) {
					this.props.updateUser(
						userID,
						firstName,
						response.data.token
					);
					localStorage.setItem("authToken", response.data.token);
					this.props.history.push("/profile");
				}
			})
			.catch(error => {
				console.log(error);
			});
	};

	render() {
		const { user, tokenChecked } = this.props;
		return (
			<div>
				{!tokenChecked && <Spinner />}
				{user ? (
					<Redirect to="/profile" />
				) : (
					<div className="container">
						<div className="row">
							<form className="col s12 m6 offset-m3">
								<div className="card blue-grey darken-1">
									<div className="card-content white-text">
										<span className="card-title">
											Login
										</span>
										<div className="row">
											<div className="input-field col s12">
												<input
													id="loginEmail"
													type="email"
													className="validate"
													value={
														this.state.emailValue
													}
													onChange={
														this.handleEmailChange
													}
												/>
												<label htmlFor="loginEmail">
													Email
												</label>
											</div>
										</div>
										<div className="row">
											<div className="input-field col s12">
												<input
													id="loginPassword"
													type="password"
													value={
														this.state.passwordValue
													}
													onChange={
														this
															.handlePasswordChange
													}
												/>
												<label htmlFor="loginPassword">
													Password
												</label>
											</div>
										</div>
										<div className="row center-align">
											<div className="col s12">
												<button
													style={loginButtonStyle}
													className="btn waves-effect waves-light"
													onClick={this.handleLogin}
												>
													Log In
												</button>
											</div>
										</div>
										<div className="row">
											<div className="col s12">
												<p className="center-align">
													New User? Create an account
													<Link to="/register">
														{" "}
														here
													</Link>
												</p>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Login;
