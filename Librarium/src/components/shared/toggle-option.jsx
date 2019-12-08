import ObjectUtilities from '../../utilities/object';
import React from 'react';

function ToggleOption(props) {
	const inputProps = ObjectUtilities.dropKeys(props, 'label');
	return (
		<label className="toggle-option">
			<small>{props.label}</small>
			<input {...inputProps} type="radio" />
		</label>
	);
}

export default ToggleOption;
