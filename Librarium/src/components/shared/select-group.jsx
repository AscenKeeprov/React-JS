import ObjectUtilities from '../../utilities/object';
import React from 'react';

export default function SelectGroup(props) {
	const { label, options, required } = props;
	const selectProps = ObjectUtilities.dropKeys(props, ['label', 'options']);
	const selectOptions = options.map(({ text, value }, index) =>
		<option key={index} value={value}>{text}</option>
	);
	return (
		<label className="select-group">
			<span title={required && 'Required'}>{label}{required && <sup className="required">*</sup>}</span>
			<select {...selectProps}>{selectOptions}</select>
		</label>
	);
}
