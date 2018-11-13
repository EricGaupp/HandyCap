import React from "react";
import { Switch, Link, Route, Redirect } from "react-router-dom";

import AddScore from "./AddScore";

const Profile = props => {
	return (
		<div className="container">
			<div className="row">
				<div className="col s3">
					Profile Page
					<hr />
					<ul>
						<li>
							<Link to="/profile">Profile Home</Link>
						</li>
						<li>
							<Link to="/profile/stats">Stats</Link>
						</li>
						<li>
							<Link to="/profile/addscore">Add Score</Link>
						</li>
					</ul>
				</div>
				<div className="col s9">
					<Switch>
						<Route
							exact
							path="/profile"
							render={() => {
								return <h1>Profile Home</h1>;
							}}
						/>
						<Route
							exact
							path="/profile/addscore"
							component={AddScore}
						/>
						<Route
							exact
							path="/profile/stats"
							render={() => <h1>Stats</h1>}
						/>
						<Redirect to="/profile" />
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default Profile;
