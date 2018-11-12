import React, { Component } from "react";
import axios from "axios";

const postButtonStyle = {
	width: "100%"
};

class AddScore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			course: "",
			date: "",
			tees: "",
			gross: ""
		};

		this.handleCourseChange = this.handleCourseChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleTeeChange = this.handleTeeChange.bind(this);
		this.handleGrossChange = this.handleGrossChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleCourseChange(event) {
		this.setState({
			course: event.target.value
		});
	}

	handleDateChange(event) {
		this.setState({
			date: event.target.value
		});
	}

	handleTeeChange(event) {
		this.setState({
			tees: event.target.value
		});
	}

	handleGrossChange(event) {
		this.setState({
			gross: parseInt(event.target.value, 10)
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const authToken = localStorage.getItem("authToken");
		axios
			.post("/api/addScore", this.state, {
				headers: { authorization: `Bearer ${authToken}` }
			})
			.then(response => {
				console.log(response);
			});
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<form className="col s12 m6 offset-m3">
						<div className="card blue-grey darken-1">
							<div className="card-content white-text">
								<span className="card-title">Post a Score</span>
								<div className="row">
									<div className="input-field col s12">
										<input
											id="course"
											type="text"
											value={this.state.courseValue}
											onChange={this.handleCourseChange}
										/>
										<label htmlFor="course">Course</label>
									</div>
								</div>
								<div className="row">
									<div className="input-field col s12">
										<input
											id="tees"
											type="text"
											value={this.state.teesValue}
											onChange={this.handleTeeChange}
										/>
										<label htmlFor="tees">Tees</label>
									</div>
								</div>
								<div className="row">
									<div className="input-field col s12">
										<input
											id="date"
											type="date"
											value={this.state.date}
											onChange={this.handleDateChange}
										/>
									</div>
								</div>
								<div className="row">
									<div className="input-field col s12">
										<input
											id="gross"
											type="number"
											value={this.state.grossValue}
											onChange={this.handleGrossChange}
										/>
										<label htmlFor="gross">Gross</label>
									</div>
								</div>
								<div className="row">
									<div className="col s12">
										<button
											style={postButtonStyle}
											className="btn waves-effect waves-light right"
											onClick={this.handleSubmit}
										>
											Post Score
										</button>
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

export default AddScore;
