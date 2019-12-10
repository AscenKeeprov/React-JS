import Button from './button';
import React from 'react';
import { useHistory } from 'react-router-dom';

function ButtonBack({ fallback, label }) {
	let history = useHistory();

	const goBack = () => {
		if (history && history.length > 1) {
			history.goBack();
		} else history.push(fallback || '/');
	}

	return (
		<Button label={label || 'Back'} onClick={goBack} type="button" />
	);
}

export default ButtonBack;
