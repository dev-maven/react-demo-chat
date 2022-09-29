import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Wrapper from '../Helpers/Wrappers';
import NameModal from '../UI/NameModal';
import ChatItem from './ChatItem';
import classes from './ChatRoom.module.css';

const ChatRoom = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [currentUser, setCurrentUser] = useState();
	const [messages, setMessages] = useState([]);
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

	const submitHandler = (event) => {
		event.preventDefault();
		const name = msgInputRef.current.value;
	};
	return (
		<Wrapper>
			{!currentUser && <NameModal onConfirm={addNameHandler} />}
			{currentUser && (
				<Wrapper>
					<div className={classes.chatTop}>Welcome to the ChatRoom</div>
					<div className={classes.chatArea}>
						<ChatItem msgs={messages} user={currentUser} />
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
				</Wrapper>
			)}
		</Wrapper>
	);
};

export default ChatRoom;
