import { filterByKeys } from '../../utilities/object';
import React from 'react';

export default function InputGroup(props) {
	const { label, required, type } = props;
	const className = [
		'input-group',
		type === 'checkbox' ? 'checkbox-group' : ''
	].join(' ').trim();
	const inputProps = filterByKeys(props, 'label');
	return (
		<label className={className}>
			<span title={required && 'Required'}>{label}{required && <sup className="required">*</sup>}</span>
			<input {...inputProps} />
		</label>
	);
}
