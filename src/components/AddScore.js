import React, { Component } from "react";
import axios from "axios";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";

const postButtonStyle = {
	width: "100%"
};

class AddScore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			availableStates: [],
			selectedState: null,
			availableCourses: [],
			selectedCourse: null,
			availableCoursesByState: [],
			availableTees: [],
			selectedTess: null,
			courseId: "",
			date: "",
			teesId: "",
			grossScore: "",
			courseHandicap: ""
		};
	}

	handleCourseChange = event => {
		//Change Available Tees
		this.setState({ selectedCourse: event.target.value });
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

	handleGrossChange = event => {
		this.setState({
			gross: parseInt(event.target.value, 10)
		});
	};

	handleStateChange = event => {
		this.setState({ selectedState: event.target.value });
		const coursesByState = this.state.availableCourses
			.filter(course => course.state === event.target.value)
			.sort();
		this.setState({
			availableCoursesByState: coursesByState,
			selectedCourse: coursesByState[0].courseName
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
		//AJAX Call to get available courses to inject into state to then populate dropdown box
		const authToken = localStorage.getItem("authToken");
		axios
			.get("/api/getCourses", {
				headers: { authorization: `Bearer ${authToken}` }
			})
			.then(results => {
				//Initialize a Sorted State for State, Course and Tee data
				const states = results.data.map(course => course.state).sort();
				const setOfStates = [...new Set(states)];
				const coursesByState = results.data
					.filter(course => course.state === setOfStates[0])
					.sort();
				this.setState({
					availableCourses: results.data,
					availableStates: setOfStates,
					selectedState: setOfStates[0],
					selectedCourse: coursesByState[0].courseName,
					availableCoursesByState: coursesByState
				});
			});
	}

	componentDidUpdate() {
		var elems = document.querySelectorAll("select");
		M.FormSelect.init(elems);
	}

	render() {
		return (
			<div className="row">
				<form className="col s12 m10 offset-m1">
					<div className="card">
						<div className="card-content white-text">
							<span className="card-title">Post a Score</span>
							<div className="row">
								<div className="input-field col s12">
									<select
										value={this.state.selectedState || ""}
										onChange={this.handleStateChange}
									>
										{this.state.availableStates.map(
											state => {
												return (
													<option key={state}>
														{state}
													</option>
												);
											}
										)}
									</select>
									<label>State</label>
								</div>
							</div>
							<div className="row">
								<div className="input-field col s12">
									<select
										value={this.state.selectedCourse || ""}
										onChange={this.handleCourseChange}
									>
										{this.state.availableCoursesByState.map(
											course => {
												return (
													<option key={course._id}>
														{course.courseName}
													</option>
												);
											}
										)}
									</select>
									<label>Courses</label>
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
