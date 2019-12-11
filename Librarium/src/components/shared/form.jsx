import ObjectUtilities from '../../utilities/object';
import React, { useEffect, useRef } from 'react';

export default function Form(props) {
	const { children, fields, title } = props;
	const formProps = ObjectUtilities.dropKeys(props, ['fields', 'title']);
	const formRef = useRef(null);

	useEffect(() => {
		Array.from(formRef.current.querySelectorAll('input'))
			.filter(input => input.type === 'radio')
			.forEach(input => {
				if (input.value === fields[input.name]) {
					input.checked = true;
					input.setAttribute('checked', '');
				}
			});
	}, [fields]);

	return (
		<form noValidate ref={formRef} {...formProps}>
			{title && <h1 className="heading">{title}</h1>}
			{children}
		</form>
	);
}
