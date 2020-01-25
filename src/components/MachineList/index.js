import React from "react";

export default class MachineList extends React.Component {

	handleClick(machineId) {
		this.props.onSelectMachine(machineId);
	}

	render() {
		const machines = Object.keys(this.props.machines).map(key => {
			const mac = this.props.machines[key];
			return <li key={ "machine_" + mac._id }><button onClick={this.handleClick.bind(this, mac._id)} title={mac.description}>{ mac.model }</button></li>
		});

		return (
				<div className="navitagion">
					<h3>Online machines</h3>
					<ul className="machines">
						{ machines }
					</ul>
				</div>
			)
	}

}
