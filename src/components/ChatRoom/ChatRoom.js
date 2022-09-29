import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Wrapper from '../Helpers/Wrappers';
import NameModal from '../UI/NameModal';

const ChatRoom = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [currentUser, setCurrentUser] = useState();

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
	return (
		<Wrapper>
			{!currentUser && <NameModal onConfirm={addNameHandler} />}
			{currentUser && <h3>Chat active</h3>}
		</Wrapper>
	);
};

export default ChatRoom;
