import React from 'react';
import ToggleOption from '../shared/toggle-option';
import withForwardRef from '../higher-order/with-forward-ref';

/**
 * Renders a toggle component with labels and animated switch.
 * @param {Function} onChange - a function that makes this toggle operational
 * @param {Array<Object>} options - an array of objects containing labels and values for each of the toggle's states
 * @param {String} name - the name of the property this toggle is bound to
 * @param {String} ref - a forward reference that the toggle state update mechanism relies on
 * @param {*} value - the initial state of the toggle
 */
class Toggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			switch: Object.values(props.options)
				.map(option => option.value).indexOf(props.value),
			value: props.value
		};
		this.getToggleInputs = this.getToggleInputs.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.setSwitchState = this.setSwitchState.bind(this);
		this.toggleRef = props.forwardRef;
	}

	componentDidMount() {
		const initialInput = this.getToggleInputs()
			.filter(input => input.value === this.state.value)[0];
		initialInput.checked = true;
		initialInput.setAttribute('checked', '');
	}

	getToggleInputs() {
		const toggle = this.toggleRef.current;
		return Array.from(toggle.querySelectorAll('input'));
	}

	handleToggle() {
		const uncheckedInput = this.getToggleInputs()
			.filter(input => input.checked === false)[0];
		uncheckedInput.click();
	}

	render() {
		const { name, onChange, options } = this.props;
		const switchState = this.state.switch;
		return (
			<div className="toggle" ref={this.toggleRef}>
				<ToggleOption label={options[0].label} name={name} onChange={e => onChange(e, this.setSwitchState)} value={options[0].value} />
				<div className="toggle-switch" data-state={switchState} onClick={this.handleToggle} />
				<ToggleOption label={options[1].label} name={name} onChange={e => onChange(e, this.setSwitchState)} value={options[1].value} />
			</div>
		);
	}

	setSwitchState(event) {
		const switchState = this.getToggleInputs().indexOf(event.target);
		this.setState({ switch: switchState });
	}
}

export default withForwardRef(Toggle);
