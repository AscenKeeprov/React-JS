import ObjectUtilities from '../../utilities/object';
import React from 'react';

function withForm(Component) {
	class ComponentWithForm extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				form: props.data ? props.data : {}
			};
			this.handleChange = this.handleChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.populate = this.populate.bind(this);
		}

		handleChange(event, callback) {
			const field = event.target;
			const name = field.name;
			const value = field.type === 'checkbox' ? field.checked : field.value;
			if (field.type === 'radio') {
				Array.from(document.getElementsByName(name)).forEach(e => {
					if (e !== field) e.removeAttribute('checked');
				});
				field.setAttribute('checked', '');
			}
			let formData = { ...this.state.form };
			formData[name] = value;
			if (callback && typeof callback === 'function') {
				event.persist();
				this.setState({ form: formData }, () => {
					callback(event);
				});
			} else this.setState({ form: formData });
		}

		handleSubmit(event, callback) {
			event.preventDefault();
			if (callback && typeof callback === 'function') {
				const eligibleFields = ['input', 'select', 'textarea'];
				const formFields = Array.from(event.target.elements).filter(e =>
					eligibleFields.includes(e.localName) ||
					eligibleFields.includes(e.nodeName.toLowerCase()) ||
					eligibleFields.includes(e.tagName.toLowerCase())
				).reduce((fields, element) => {
					if (element.type === 'radio') {
						if (element.checked) fields.push(element);
					} else fields.push(element);
					return fields;
				}, []);
				const formData = formFields.reduce((data, e) => {
					if (e.type === 'checkbox') data[e.name] = e.checked;
					else data[e.name] = e.value;
					return data;
				}, {});
				callback(formData);
			} else throw new Error('Handler callback must be a function!');
		}

		populate(formData) {
			this.setState({ form: formData });
		}

		render() {
			const formInterface = {
				fields: this.state.form,
				handleChange: this.handleChange,
				handleSubmit: this.handleSubmit,
				populate: this.populate
			};
			const componentProps = ObjectUtilities.dropKeys(this.props, 'data');
			return (
				<Component form={formInterface} {...componentProps}>
					{this.props.children}
				</Component >
			);
		}
	};

	ComponentWithForm.displayName = `${Component.displayName || Component.name || 'Component'}WithForm`;

	return ComponentWithForm;
}

export default withForm;
