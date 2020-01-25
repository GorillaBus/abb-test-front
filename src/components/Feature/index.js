import React from "react";
import Control from "../Control";

export default class Feature extends React.Component {
	render() {
		const name = this.props.controls[0].feature_title;
		const controls = this.props.controls.map((ctrl, idx) => {
			return <Control key={ "control_" + idx } data={ ctrl } />
		});

		return (
				<div className="feature">
					<h4 className="valid">{ name }</h4>

						{ controls }

					<div className="clearfix"></div>
				</div>
		)
	}
}
