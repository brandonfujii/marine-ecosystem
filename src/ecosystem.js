import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fish from './fish';

class Ecosystem extends Component {
	constructor(props) {
		super(props);

		this.renderFish = this.renderFish.bind(this);
		this.onNet = this.onNet.bind(this);
	}

	renderFish(fish) {
		return fish.map((f, i) => {
			return <Fish key={i} index={i} x={f.x} y={f.y} />
		})
	}

	onNet(e) {
		let radius = this.props.netRadius;
		let netArea = { x1: e.clientX - radius, x2: e.clientX + radius,
			  y1: e.clientY - radius, y2: e.clientY + radius };

		this.props.onNet(netArea);
	}

	render() {
		return (
			<div id="ecosystem" className="clearfix" onClick={this.onNet}>
				{ this.renderFish(this.props.fish) }
			</div>
		);
	}
}

Ecosystem.propTypes = {
	fish: PropTypes.array,
	netRadius: PropTypes.number,
	onNet: PropTypes.func
}

export default Ecosystem;