import React from 'react';

Object.filter = (obj, predicate) =>
	Object.fromEntries(Object.entries(obj).filter(predicate));

class InputGroup extends React.Component {
	render() {
		let inputProps = Object.fromEntries(
			Object.entries(this.props).filter(([key, value]) => key !== 'label')
		);
		return (
			<label className="label-enclosing">
				<span>{this.props.label}{this.props.required && <sup className="required">*</sup>}</span>
				<input {...inputProps} />
			</label>
		);
	}
}

export default InputGroup;
