import React from "react";

export default class Control extends React.Component {

	validateControlComponent(item) {
		return {
			x_valid: item.x_valid === 0 ? "valid" : item.x_valid === 1 ? "med" : "invalid",
			y_valid: item.y_valid === 0 ? "valid" : item.y_valid === 1 ? "med" : "invalid",
			z_valid: item.z_valid === 0 ? "valid" : item.z_valid === 1 ? "med" : "invalid",
			d_valid: item.d_valid === 0 ? "valid" : item.d_valid === 1 ? "med" : "invalid"
		}
	}

	render() {
		const { data } = this.props;
		const validations = this.validateControlComponent(data);

		return (
				<div className="control">
					<table border="0" cellPadding="10" cellSpacing="0">
						<thead>
							<tr>
								<th>Control</th>
								<th>Dev</th>
								<th>Out</th>
								<th>Val</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>X</td>
								<td><span className="data">{data.x_dev.toFixed(3)}</span></td>
								<td><span className="data">{data.x_total_dev.toFixed(3)}</span></td>
								<td><div className={ "bullet "+ validations.x_valid }></div></td>
							</tr>
							<tr>
								<td>Y</td>
								<td><span className="data">{data.y_dev.toFixed(3)}</span></td>
								<td><span className="data">{data.y_total_dev.toFixed(3)}</span></td>
								<td><div className={ "bullet "+ validations.y_valid }></div></td>
							</tr>
							<tr>
								<td>Z</td>
								<td><span className="data">{data.z_dev.toFixed(3)}</span></td>
								<td><span className="data">{data.z_total_dev.toFixed(3)}</span></td>
								<td><div className={ "bullet "+ validations.z_valid }></div></td>
							</tr>
							<tr>
								<td>Diam</td>
								<td><span className="data">{data.d_dev.toFixed(1)}</span></td>
								<td><span className="data">{data.d_total_dev.toFixed(1)}</span></td>
								<td><div className={ "bullet "+ validations.d_valid }></div></td>
							</tr>
						</tbody>
					</table>
				</div>
			)
	}
}
