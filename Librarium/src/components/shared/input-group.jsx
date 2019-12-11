import ObjectUtilities from '../../utilities/object';
import React from 'react';

export default function InputGroup(props) {
	const { error, label, required, type } = props;

	const className = [
		'input-group',
		type === 'checkbox' ? 'checkbox-group' : '',
		type === 'radio' ? 'radio-group' : ''
	].join(' ').trim();

	const inputProps = ObjectUtilities.dropKeys(props, ['error', 'label']);

	return (
		<label className={className}>
			<span title={required && 'Required'}>{label}{required && <sup className="required">*</sup>}</span>
			<input {...inputProps} />
			{error && <small className={`error-validation`}>{error.replace('{0}', label)}</small>}
		</label>
	);
}
