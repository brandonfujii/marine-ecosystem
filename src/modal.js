import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

class Modal extends Component {
	constructor(props) {
		super(props);

		this.handleAction = this.handleAction.bind(this);
	}

	handleAction() {
		this.props.changeModal(null);
		this.props.actionFunction();
	}

	render() {
		return (
			<ReactModal isOpen={this.props.isOpen} 
					contentLabel="game-modal"
					portalClassName="modal-portal"
  					overlayClassName="modal-overlay" >
				{ this.props.children }
				<div><button className="action-button"
							onClick={this.handleAction}>{ this.props.actionText }</button></div>
			</ReactModal>
		);
	}
}

Modal.propTypes = {
	changeModal: PropTypes.func,
	actionFunction: PropTypes.actionFunction,
	isOpen: PropTypes.bool,
	actionText: PropTypes.string
}

export default Modal;