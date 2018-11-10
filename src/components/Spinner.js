import React from "react";

const spinnerStyle = {
	display: "flex",
	minHeight: "100vh",
	alignItems: "center",
	justifyContent: "center"
};

const Spinner = () => {
	return (
		<div style={spinnerStyle}>
			<div className="preloader-wrapper big active">
				<div className="spinner-layer spinner-blue-only">
					<div className="circle-clipper left">
						<div className="circle" />
					</div>
					<div className="gap-patch">
						<div className="circle" />
					</div>
					<div className="circle-clipper right">
						<div className="circle" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Spinner;
