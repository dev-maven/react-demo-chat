import classes from './ChatItem.module.css';
import receiverImage from '../../assets/receiver.png';
import senderImage from '../../assets/sender.png';
import React from 'react';
const ChatItem = (props) => {
	return (
		<React.Fragment>
			{props.msgs.map((message) => (
				<div key={message.id}>
					{message.sender !== props.user && (
						<div className={classes.chatContainer}>
							<img
								src={receiverImage}
								className={classes.receiverImage}
								alt='Receiver'
							/>
							<div className={classes.receivedChat}> {message.message}</div>
						</div>
					)}
					{message.sender === props.user && (
						<div className={classes.sentChatContainer}>
							<div className={classes.sentChat}>{message.message}</div>
							<img
								src={senderImage}
								className={classes.senderImage}
								alt='Sender'
							/>
						</div>
					)}
				</div>
			))}
		</React.Fragment>
	);
};

export default ChatItem;
