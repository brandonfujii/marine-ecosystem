import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Fish = function(props) {
	let { x, y, index } = props;

	return (
		<div className={`fish-${index} clearfix`}
			style={{ position: 'absolute', top: y, left: x }}>
			<img src='assets/clownfish.png' /> 	
		</div>
	);
}

Fish.propTypes = {
	x: PropTypes.number,
	y: PropTypes.number,
	index: PropTypes.number
}

export default Fish;