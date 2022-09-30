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
	const [chats, setChats] = useState([]);
	const dispatch = useDispatch();

	const loadMoreRef = useRef(null);

	const navigate = useNavigate();
	const location = useLocation();
	const [currentUser, setCurrentUser] = useState();
	const [startLoad, setStartLoad] = useState(false);

	const msgInputRef = useRef();
	const chatItemRef = useRef();
	const messagesEndRef = useRef(null);

	const queryParams = new URLSearchParams(location.search);
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const scrollToChat = () => {
		chatItemRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		toggleLoad();
		scrollDelay();
	}, []);

	const scrollDelay = () => {
		setTimeout(() => {
			scrollToBottom();
		}, 500);
	};

	const toggleLoad = () => {
		setStartLoad(false);
		setTimeout(() => {
			setStartLoad(true);
		}, 2000);
	};

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
		setChats(message.slice(-25));
	}, [message]);

	const loadMessagesHandler = () => {
		setTimeout(() => {
			const length = chats.length + 25;
			setChats(message.slice(-length));
			toggleLoad();
			scrollToChat();
		}, 500);
	};

	useEffect(() => {
		window.addEventListener('storage', onStorageUpdate);
		return () => {
			window.removeEventListener('storage', onStorageUpdate);
		};
	}, []);

	useEffect(() => {
		if (loadMoreRef.current) {
			const observer = new IntersectionObserver((entries, observer) => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					loadMessagesHandler();
				}
			});

			observer.observe(loadMoreRef.current);
		}
	}, [loadMoreRef, loadMessagesHandler]);

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
			scrollDelay();
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
						{chats.length < message.length && startLoad && (
							<div className={classes.loadMore} ref={loadMoreRef}></div>
						)}
						<div ref={chatItemRef}>
							<ChatItem msgs={chats} user={currentUser} />
						</div>
						<div ref={messagesEndRef} />
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
