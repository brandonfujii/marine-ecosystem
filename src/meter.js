import React, { Component } from 'react';
import PropTypes from 'prop-types';


const Meter = function(props) {
	let { delta, offset } = props;

	return (
		<div id="sidebar" className="clearfix">
			<div id="sustainability-meter">
				<div id="meter-color"></div>
			</div>
			<div id="indicator" style={{ top: offset }}>
				<img src="assets/fish_indicator.png" />
				<div id="points">+{ delta }</div>
			</div>
			<div id="meter-label" style={{top: '10px'}}>Overpopulation</div>
			<div id="meter-label" style={{bottom: '1px'}}>Underpopulation</div>
		</div>
	);
}

Meter.propTypes = {
	delta: PropTypes.number,
	offset: PropTypes.string
}

export default Meter;
