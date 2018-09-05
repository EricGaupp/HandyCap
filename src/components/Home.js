import React from "react";

import Login from "./Login";
import Spinner from "./Spinner";

const Home = props => {
	if (!props.user && !props.tokenChecked) {
		return <Spinner />;
	}

	return (
		<div>
			{props.user && props.tokenChecked ? (
				props.history.push("/profile")
			) : (
				<Login {...props} />
			)}
		</div>
	);
};

export default Home;
