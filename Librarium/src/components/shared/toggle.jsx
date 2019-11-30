import ToggleOption from '../shared/toggle-option';
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
		const { boundTo, onChange, options } = this.props;
		return (
			<div className="toggle-wrapper">
				<ToggleOption
					checked={options[0].value === this.state.value}
					label={options[0].label}
					name={boundTo}
					onChange={onChange}
					onClick={this.handleToggle}
					value={options[0].value}
				/>
				<div className="toggle-switch" onClick={this.handleToggle} data-state={this.state.switch} />
				<ToggleOption
					checked={options[1].value === this.state.value}
					label={options[1].label}
					name={boundTo}
					onChange={onChange}
					onClick={this.handleToggle}
					value={options[1].value}
				/>
			</div>
		);
	}
}

export default Toggle;
