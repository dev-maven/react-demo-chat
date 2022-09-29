import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

import Card from './Card';
import classes from './NameModal.module.css';

const Backdrop = () => {
	return <div className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
	const nameInputRef = useRef();

	const submitHandler = (event) => {
		event.preventDefault();
		const name = nameInputRef.current.value;
		props.onConfirm(name);
	};
	return (
		<Card className={classes.modal}>
			<form className={classes.form} onSubmit={submitHandler}>
				<div className={classes.input}>
					<label htmlFor='nameInput'>Enter Username</label>
					<input ref={nameInputRef} type='text' />
				</div>
				<footer className={classes.actions}>
					<button type='submit' className={classes.button}>
						Start Chat
					</button>
				</footer>
			</form>
		</Card>
	);
};

const NameModal = (props) => {
	return (
		<React.Fragment>
			{ReactDOM.createPortal(
				<Backdrop />,
				document.getElementById('backdrop-root')
			)}
			{ReactDOM.createPortal(
				<ModalOverlay onConfirm={props.onConfirm} />,
				document.getElementById('overlay-root')
			)}
		</React.Fragment>
	);
};

export default NameModal;
