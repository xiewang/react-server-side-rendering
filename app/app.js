import React, { Component } from 'react';
import styles from './style.css';

class App extends Component {
	constructor(props) {
		super(props);
		this._increment = this._increment.bind(this);
		this.state ={
			count: this.props.initialCount
		}
	}

	_increment() {
		this.setState({count: this.state.count + 1});
	}

	render() {
		return(
			<div>
				<span>the count is: </span>
				<span>{this.state.count}</span>
				<button  onClick={this._increment}>
					+1
				</button>
			</div>
		);
	}
}


export default App;