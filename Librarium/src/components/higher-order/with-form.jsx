import React from 'react';

function withForm(Component) {
	class ComponentWithForm extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				form: {}
			};
			this.handleChange = this.handleChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
		}

		handleChange(event) {
			const name = event.target.name;
			const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
			let formData = { ...this.state.form };
			formData[name] = value;
			this.setState({ form: formData });
		}

		handleSubmit(event, callback) {
			event.preventDefault();
			if (callback && typeof callback === 'function') {
				const formData = Array.from(event.target.elements)
					.filter(e => ['input', 'select', 'textarea']
						.includes(e.localName.toLowerCase()))
					.reduce((obj, e) => {
						obj[e.name] = e.value;
						return obj;
					}, {});
				callback(formData);
			} else throw new Error('Handler callback must be a function!');
		}

		render() {
			const formInterface = {
				fields: this.state.form,
				handleChange: this.handleChange,
				handleSubmit: this.handleSubmit,
			}
			return (
				<Component form={formInterface} {...this.props}>
					{this.props.children}
				</Component >
			);
		}
	};

	ComponentWithForm.displayName = `${Component.displayName || Component.name || 'Component'}WithForm`;

	return ComponentWithForm;
}

export default withForm;
