import React from "react";
import Feature from "../Feature";

export default class Panel extends React.Component {
	render() {
		const machineName = this.props.machine;

		const reducer = (acum, curr) => {
			if (!acum.hasOwnProperty(curr.feature_id)) {
				acum[curr.feature_id] = [];
			}
			acum[curr.feature_id].push(curr);
			return acum;
		};

		const features = this.props.controls.reduce(reducer, {});

		const featuresView = Object.keys(features).map((featureGroup, idx) => {
			return <Feature
						key={ "feature_" + idx }
						controls={ features[featureGroup] } />
		});

		return (
			<div className="panel">
				<h3>Monitoring machine: &nbsp; <span>{ machineName }</span></h3>

				<div className="part">

					{ featuresView }

				</div>
			</div>
		)
	}
}
