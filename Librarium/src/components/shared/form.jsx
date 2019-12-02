import { filterByKeys } from '../../utilities/object';
import React from 'react';

export default function Form(props) {
	const formProps = filterByKeys(props, ['fields', 'title']);
	return (
		<form {...formProps}>
			{props.title && <h1 className="heading">{props.title}</h1>}
			{props.children}
		</form>
	);
}
