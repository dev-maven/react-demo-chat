import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import messageReducer from '../store/messageSlice';

export function renderWithProviders(
	ui,
	{
		preloadedState = {},
		store = configureStore({
			reducer: { reducer: messageReducer },
			preloadedState,
		}),
		...renderOptions
	} = {}
) {
	function Wrapper({ children }) {
		return <Provider store={store}>{children}</Provider>;
	}
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
