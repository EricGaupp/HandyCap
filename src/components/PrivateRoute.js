import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, path, ...rest }) => (
	<Route
		path={path}
		render={props =>
			rest.user ? (
				<Component {...rest} {...props} />
			) : (
				<Redirect to="/login" />
			)
		}
	/>
);

export default PrivateRoute;
