import InputGroup from './input-group';
import ObjectUtilities from '../../utilities/object';
import React from 'react';

export default function InputSet(props) {
	const { label, name, options, required, type } = props;
	const inputProps = ObjectUtilities.dropKeys(props, ['label', 'options']);
	const inputs = options.map(({ label, value }, index) => {
		if (type === 'checkbox') inputProps.name = `${name}_${value}`;
		return <InputGroup key={index} label={label} value={value} {...inputProps} />
	});
	return (
		<div className="input-set">
			<span title={required && 'Required'}>{label}{required && <sup className="required">*</sup>}</span>
			{inputs}
		</div>
	);
}
