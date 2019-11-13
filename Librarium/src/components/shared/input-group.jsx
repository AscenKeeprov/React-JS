import React from 'react';

class InputGroup extends React.Component {
	render() {
		return (
			<label className="label-enclosing">
				<span>{this.props.label}{this.props.required && <sup className="required">*</sup>}</span>
				<input
					name={this.props.name}
					onChange={this.props.onChange}
					placeholder={this.props.placeholder}
					type={this.props.type}
					value={this.props.value} />
			</label>
		);
	}
}

export default InputGroup;
