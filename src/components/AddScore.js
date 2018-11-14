import React, { Component } from "react";
import axios from "axios";

const postButtonStyle = {
	width: "100%"
};

class AddScore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			availableCourses: [],
			availableTees: [],
			courseId: "",
			date: "",
			teesId: "",
			grossScore: "",
			courseHandicap: ""
		};
	}

	handleCourseChange = event => {
		this.setState({
			course: event.target.value
		});
		//AJAX call to set state for avaiable tees for that course
	};

	handleCourseHandicapChange = event => {
		this.setState({
			courseHandicap: event.target.value
		});
	};

	handleDateChange = event => {
		this.setState({
			date: event.target.value
		});
	};

	handleTeeChange = event => {
		this.setState({
			teesId: event.target.value
		});
	};

	handleGrossChange = event => {
		this.setState({
			gross: parseInt(event.target.value, 10)
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		const authToken = localStorage.getItem("authToken");
		axios
			.post("/api/addScore", this.state, {
				headers: { authorization: `Bearer ${authToken}` }
			})
			.then(response => {
				console.log(response);
			});
	};

	componentDidMount() {
		{
			/*AJAX Call to get available courses to inject into state to then populate dropdown box*/
		}
	}

	render() {
		return (
			<div className="row">
				<form className="col s12 m6 offset-m3">
					<div className="card blue-grey darken-1">
						<div className="card-content white-text">
							<span className="card-title">Post a Score</span>
							<div className="row">
								<div className="input-field col s12">
									{/*Convert to dropdown of courses available in this.state. Assign data-attribute as course ObjectId*/}
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
								<div className="input-field col s12">
									<input
										id="courseHandicap"
										type="number"
										value={this.state.courseHandicapValue}
										onChange={
											this.handleCourseHandicapChange
										}
									/>
									<label htmlFor="courseHandicap">
										Course Handicap
									</label>
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
		);
	}
}

export default AddScore;
