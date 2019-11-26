import React from 'react';

/**
 * Renders a toggle component with labels and animated switch.
 * @param {String} boundTo - the name of the property whose value this toggle changes
 * @param {Function} onChange - a function that makes this toggle operational
 * @param {Array<Object>} options - an array of objects containing labels and values for each of the toggle's states.
 * At least one of the options must have a 'checked' boolean property specifying the default state of the toggle!
 */
class Toggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			switch: undefined,
			value: props.options.filter(o => o.checked)[0].value
		};
		this.handleToggle = this.handleToggle.bind(this);
	}

	componentDidMount() {
		const toggleInputs = Array.from(document.querySelectorAll('.toggle-wrapper input'));
		const checkedInput = toggleInputs.filter(i => i.checked)[0];
		const switchState = toggleInputs.indexOf(checkedInput);
		this.setState({ switch: switchState });
	}

	handleToggle(event) {
		const toggleWrapper = event.target.closest('.toggle-wrapper');
		const toggleInputs = Array.from(toggleWrapper.querySelectorAll('input'));
		if (event.target.hasAttribute('checked')) return;
		if (event.target.tagName.toLowerCase() !== 'input') {
			event.target = toggleInputs.filter(i => !i.checked)[0];
			event.persist();
		}
		toggleInputs.forEach(input => {
			input.removeAttribute('checked');
			input.checked = false;
		});
		event.target.checked = true;
		event.target.setAttribute('checked', 'checked');
		this.setState({
			switch: toggleInputs.indexOf(event.target),
			value: event.target.value
		}, () => {
			if (event.isPersistent()) this.props.onChange(event);
		});
	}

	render() {
		const commonProps = Object.fromEntries(
			Object.entries(this.props).filter(e => !['boundTo', 'options'].includes(e[0]))
		);
		const optionLeft = this.props.options[0];
		const optionRight = this.props.options[1];
		return (
			<div className="toggle-wrapper">
				<label className="toggle-option">
					<small>{optionLeft.label}</small>
					<input {...commonProps} checked={optionLeft.value === this.state.value} name={this.props.boundTo} onChange={this.props.onChange} onClick={this.handleToggle} type="radio" value={optionLeft.value} />
				</label>
				<div className="toggle-switch" onClick={this.handleToggle} data-state={this.state.switch} />
				<label className="toggle-option">
					<input {...commonProps} checked={optionRight.value === this.state.value} name={this.props.boundTo} onChange={this.props.onChange} onClick={this.handleToggle} type="radio" value={optionRight.value} />
					<small>{optionRight.label}</small>
				</label>
			</div>
		);
	}
}

export default Toggle;
