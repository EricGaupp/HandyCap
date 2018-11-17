import React from "react";
import { Link } from "react-router-dom";

const ProfileSideNav = ({ match }) => {
	return (
		<div className="card hoverable">
			<div className="card-content">
				<span className="card-title">Profile Page</span>
				<div className="card-action">
					<ul>
						<li>
							<Link to={match.url}>Profile Home</Link>
						</li>
						<li>
							<Link to={`${match.url}/scores`}>Scores</Link>
						</li>
						<li>
							<Link to={`${match.url}/stats`}>Stats</Link>
						</li>
						<li>
							<Link to={`${match.url}/addscore`}>Add Score</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ProfileSideNav;
