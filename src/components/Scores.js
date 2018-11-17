import React from "react";

const Scores = ({ user, scores }) => {
	return (
		<table className="centered highlight">
			<thead>
				<tr>
					<th>Date</th>
					<th>Course</th>
					<th>Gross</th>
					<th>Net</th>
					<th>Differential</th>
				</tr>
			</thead>
			<tbody>
				{scores.map(score => {
					return (
						<tr key={score._id}>
							<td>
								{new Date(score.date).toLocaleDateString(
									"en-US"
								)}
							</td>
							<td>{score.courseId.courseName}</td>
							<td>{score.grossScore}</td>
							<td>{score.netScore}</td>
							<td>{score.differential}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Scores;
