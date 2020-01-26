import io from "socket.io-client";
import React from "react";
import Panel from "../Panel";
import MachineList from "../MachineList";
import './App.css';

export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			endpoint: "http://127.0.0.1:3001",
			token: "080fd43c58fabbb734f7cfccc7047e65",
			machines: {},
			controls: [],
			current_machine: null
		};
		this.socket = null;

		this.handleMachineListUpdate = this.handleMachineListUpdate.bind(this);
		this.handleSelectMachine = this.handleSelectMachine.bind(this);
	}

	componentDidMount() {
		const { endpoint, token } = this.state;
		const url = endpoint + "?token=" + token;
		this.socket = io(url, {
			transports: ['websocket']
		});

		/* Bind event listeners */
		this.socket.on('connect', () => {

			this.socket.on('disconnect', (socket) => {
				console.log("> Disconnected");
			});

			// Request machine list to the server
			this.socket.emit('list_machines', {}, this.handleMachineListUpdate);

			console.log('> Connected to remote server...');
		});


		this.socket.on("error", (err) => {
			console.log(`Error ${err.code}: ${err.message}`);
		});

		this.socket.on("update_machines", this.handleMachineListUpdate);

		this.socket.on("auth_succed", (socket) => {
			console.log("> Succesfully autentificated");
		});

		this.socket.on("push", (data) => {

			this.setState({
				controls: data
			});

			console.log("> Received push");
		});
	}

	handleMachineListUpdate(machines) {
		const machineList = machines.reduce((acum, curr) => {
			acum[curr._id] = curr;
			return acum;
		}, {});

		this.setState({
			machines: machineList
		});

		if (!this.state.machines.hasOwnProperty(this.state.current_machine)) {
			this.setState({
				current_machine: null
			});
		}
	}

	switchMachine(machineId) {

		this.socket.emit("switch_channel", {
			channel_id: machineId
		}, (response) => {
			if (response.error === 1) {
				alert("Server error: ", response.error_msg);
				return false;
			}

			this.setState({
				current_machine: response.data.channel_id,
				controls: []
			});
		});
	}

	handleSelectMachine(machineId) {
		this.switchMachine(machineId);
	}

	render() {
		const { machines, controls, current_machine } = this.state;
		const gotMachines = Object.entries(machines).length > 0;
		const gotControls = controls.length > 0;

		return (
			<div className="wrapper">

				<div className="title"><h1>Machine monitoring client</h1></div>

				{ gotMachines ?
					<MachineList
								machines={ machines }
								onSelectMachine={ this.handleSelectMachine }
							/> :

					<div className="panel"><h2>There are no online machines at the moment...</h2></div>
				}

				{ gotMachines && current_machine && gotControls ?
					<Panel
						controls={ controls }
						machine={ this.state.machines[current_machine].model }	/> :

					<div></div>
				}

			</div>
		);
	}
}
