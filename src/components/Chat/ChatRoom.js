import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import NameModal from '../UI/NameModal';
import ChatItem from './ChatItem';
import classes from './ChatRoom.module.css';
import { messageActions } from '../../store/messageSlice';
import store from '../../store';

const ChatRoom = () => {
	const message = useSelector(() => store.getState().messages);
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const location = useLocation();
	const [currentUser, setCurrentUser] = useState();

	const msgInputRef = useRef();

	const queryParams = new URLSearchParams(location.search);

	const username = queryParams.get('user');
	if (username && !currentUser) {
		setCurrentUser(username);
	}
	const addNameHandler = (text) => {
		navigate({
			pathname: '',
			search: `user=${text}`,
		});
	};

	const onStorageUpdate = (e) => {
		const { key } = e;
		if (key === 'chats') {
			dispatch(messageActions.refreshMessages());
		}
	};

	useEffect(() => {
		window.addEventListener('storage', onStorageUpdate);
		return () => {
			window.removeEventListener('storage', onStorageUpdate);
		};
	}, []);

	const submitHandler = (event) => {
		event.preventDefault();
		const msg = msgInputRef.current.value;
		if (msg) {
			const payload = {
				id: (
					Date.now().toString(36) + Math.random().toString(36).substring(2)
				).toString(),
				message: msg,
				sender: username,
			};

			dispatch(messageActions.sendMessage(payload));

			msgInputRef.current.value = '';
		}
	};
	return (
		<React.Fragment>
			{!currentUser && <NameModal onConfirm={addNameHandler} />}
			{currentUser && (
				<React.Fragment>
					<div className={classes.chatTop}>
						Welcome to the ChatRoom {currentUser}
					</div>
					<div className={classes.chatArea}>
						<ChatItem msgs={message} user={currentUser} />
					</div>
					<div className={classes.container}>
						<div className={classes.footer}>
							<form className={classes.form} onSubmit={submitHandler}>
								<div className={classes.input}>
									<input ref={msgInputRef} type='text' />
									<button type='submit' className={classes.button}>
										Send
									</button>
								</div>
							</form>
						</div>
					</div>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default ChatRoom;
