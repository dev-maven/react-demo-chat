import { createSlice } from '@reduxjs/toolkit';
import { withReduxStateSync } from 'redux-state-sync';

const msgs = JSON.parse(localStorage.getItem('chats'));
const initMessagesState = {
	messages: msgs ? msgs : [],
	change: 0,
};

const messageSlice = createSlice({
	name: 'message',
	initialState: initMessagesState,
	reducers: {
		sendMessage(state, action) {
			state.change = state.change + 1;
			state.messages.push(action.payload);
			localStorage.setItem('chats', JSON.stringify(state.messages));
		},

		refreshMessages(state) {
			const chats = JSON.parse(localStorage.getItem('chats'));
			return { ...state, messages: chats };
		},
	},
});

export const messageActions = messageSlice.actions;

export default withReduxStateSync(messageSlice.reducer);
