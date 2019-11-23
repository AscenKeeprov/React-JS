import React from 'react';

class InputGroup extends React.Component {
	render() {
		let inputProps = Object.fromEntries(
			Object.entries(this.props).filter(e => e[0] !== 'label')
		);
		if (this.props.type === 'checkbox') return (
			<label className="label-enclosing">
				<input {...inputProps} />
				<span>{this.props.label}</span>
			</label>
		);
		else return (
			<label className="label-enclosing">
				<span>{this.props.label}{this.props.required && <sup className="required">*</sup>}</span>
				<input {...inputProps} />
			</label>
		);
	}
}

export default InputGroup;
