import Button from './button';
import React from 'react';
import { useHistory } from 'react-router-dom';

function ButtonLink({ label, to }) {
	if (!to) throw new Error('Link button is missing "to" property!')
	let history = useHistory();

	const goTo = () => {
		history.push(to);
	}

	return (
		<Button label={label} onClick={goTo} type="button" />
	);
}

export default ButtonLink;
