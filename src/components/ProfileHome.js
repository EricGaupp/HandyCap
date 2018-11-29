import React from "react";

const ProfileHome = ({ user, scores }) => {
	let handicapIndex = 0;
	if (scores !== null && scores.length > 0) {
		handicapIndex =
			(0.96 *
				scores
					.map(score => {
						return score.differential;
					})
					.reduce((total, differential) => {
						return total + differential;
					}, 0)) /
			scores.length;
	} else {
		handicapIndex = "No data";
	}

	return (
		<div>
			<h1>Profile Home for {user}!</h1>
			<h3>Handicap Index = {handicapIndex}</h3>
		</div>
	);
};

export default ProfileHome;
