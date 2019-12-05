import { useEffect, useLayoutEffect, useState } from 'react';

export default function useStateWithCallback(initialState, callback) {
	const [state, setState] = useState(initialState);

	useEffect(() => callback(state), [state, callback]);

	return [state, setState];
};

export function useStateWithCallbackSync(initialState, callback) {
	const [state, setState] = useState(initialState);

	useLayoutEffect(() => callback(state), [state, callback]);

	return [state, setState];
};
