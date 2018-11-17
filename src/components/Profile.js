import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AddScore from "./AddScore";
import ProfileHome from "./ProfileHome";
import ProfileSideNav from "./ProfileSideNav";
import Scores from "./Scores";
import Stats from "./Stats";

const Profile = props => {
	const { match, user, scores } = props;
	return (
		<div className="container">
			<div className="row">
				<div className="col s3">
					<ProfileSideNav {...props} />
				</div>
				<div className="col s9">
					<Switch>
						<Route
							exact
							path={match.url}
							render={() => (
								<ProfileHome user={user} scores={scores} />
							)}
						/>
						<Route
							exact
							path={`${match.url}/addscore`}
							component={AddScore}
						/>
						<Route
							exact
							path={`${match.url}/scores`}
							render={() => (
								<Scores user={user} scores={scores} />
							)}
						/>
						<Route
							exact
							path={`${match.url}/stats`}
							render={() => <Stats user={user} scores={scores} />}
						/>
						<Redirect to="/profile" />
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default Profile;
