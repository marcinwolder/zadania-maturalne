import _ from 'lodash';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store from '..';

export type Formula = 'formula-2015' | 'formula-2023' | 'formula-stara';

type StateStore = ReturnType<typeof store.getState>;

export const pathSlice = createSlice({
	name: 'path',
	initialState: { calibrated: false, blocks: ['/strona-główna'] },
	reducers: {
		loadPath(state, action: PayloadAction<string>) {
			state.blocks.push(action.payload);
		},
		unloadPath(state) {
			state.blocks.pop();
		},
		__switch(state) {
			const blocks = [...state.blocks];
			const start = blocks.shift();
			blocks.reverse();
			blocks.unshift(start as string);
			return { calibrated: true, blocks };
		},
	},
});

export const usePath = (name: string) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(pathSlice.actions.loadPath(name));
		return () => {
			dispatch(pathSlice.actions.unloadPath());
		};
	}, [dispatch, name]);
};

export const usePathElements = () => {
	// TODO: ERROR about setting state while updating other component (unknown)
	const dispatch = useDispatch();
	const state = useSelector((state: StateStore) => state.path, _.isEqual);
	if (!state.calibrated && state.blocks.length > 1) {
		dispatch(pathSlice.actions.__switch());
	}

	return state.blocks;
};

export const useMaturaPath = () => {
	const path = [...usePathElements()].map((el) => el.replace('/', ''));
	path.shift();
	const buf = { formula: path[0], date: path[1] } as {
		formula: Formula;
		date: string;
	};
	return buf;
};

export const useMaturaColor = () => {
	const maturaPath = useMaturaPath();
	let maturaColor = '';
	switch (maturaPath.formula) {
		case 'formula-stara':
			maturaColor = 'stara';
			break;
		case 'formula-2015':
			maturaColor = '2015';
			break;
		case 'formula-2023':
			maturaColor = '2023';
			break;
	}
	return maturaColor;
};

export const useUrl = () => {
	const urlBlocks = [...usePathElements()];
	urlBlocks.shift();
	return urlBlocks.join('');
};