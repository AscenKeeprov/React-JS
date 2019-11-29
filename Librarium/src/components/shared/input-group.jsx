import React from 'react';

class InputGroup extends React.Component {
	render() {
		const { label, required, type } = this.props;
		const inputProps = Object.fromEntries(
			Object.entries(this.props).filter(e => e[0] !== 'label')
		);
		const classes = [
			'input-group',
			type === 'checkbox' ? 'checkbox-group' : ''
		];
		return (
			<label className={classes.join(' ').trim()}>
				<span title={required && 'Required'}>{label}{required && <sup className="required">*</sup>}</span>
				<input {...inputProps} />
			</label>
		);
	}
}

export default InputGroup;
