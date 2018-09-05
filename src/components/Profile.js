import React from "react";

const Profile = props => {
	return (
		<div className="card-panel teal lighten-2">
			Hello {props.user}, you little coder you.
		</div>
	);
};

export default Profile;
