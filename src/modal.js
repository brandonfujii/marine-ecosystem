import React, { Component } from 'react';
import ReactModal from 'react-modal';

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

export default Modal;