import classes from './ChatItem.module.css';
import receiverImage from '../../assets/receiver.png';
import senderImage from '../../assets/sender.png';
import Wrapper from '../Helpers/Wrappers';
const ChatItem = (props) => {
	return (
		<Wrapper>
			{props.msgs.map((message) => (
				<div>
					{message.senderName !== props.user && (
						<div className={classes.chatContainer}>
							<img
								src={receiverImage}
								className={classes.receiverImage}
								alt='Receiver'
							/>
							<div className={classes.receivedChat}>
								{' '}
								Lorem Ipsum eshjbnskbjabjvjskbsjvjksbvjsj
							</div>
						</div>
					)}
					{message.senderName === props.user && (
						<div className={classes.sentChatContainer}>
							<div className={classes.sentChat}>
								Lorem Ipsum eshjbnskbjabjvjskbsjvjksbvjsj
							</div>
							<img
								src={senderImage}
								className={classes.senderImage}
								alt='Sender'
							/>
						</div>
					)}
				</div>
			))}
		</Wrapper>
	);
};

export default ChatItem;
