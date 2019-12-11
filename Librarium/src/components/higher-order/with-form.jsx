import ObjectUtilities from '../../utilities/object';
import React from 'react';

function withForm(Component, schema) {
	class ComponentWithForm extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				form: {
					errors: {},
					fields: props.data ? props.data : {}
				}
			};
			this.handleChange = this.handleChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.populate = this.populate.bind(this);
			this.validate = this.validate.bind(this);
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
			let form = { ...this.state.form };
			form.fields[name] = value;
			delete form.errors[name];
			if (callback && typeof callback === 'function') {
				event.persist();
				this.setState({ form }, () => {
					callback(event);
				});
			} else this.setState({ form });
		}

		handleSubmit(event, callback) {
			event.preventDefault();
			if (!callback || typeof callback !== 'function')
				throw new Error('Handler callback must be a function!');
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
			this.validate(formData).then(callback).catch(errors => {
				let form = { ...this.state.form };
				form.errors = errors;
				this.setState({ form });
			});
		}

		populate(formData) {
			let form = { ...this.state.form };
			Object.keys(formData).forEach(key => {
				form.fields[key] = formData[key];
			});
			this.setState({ form });
		}

		render() {
			const formInterface = {
				errors: this.state.form.errors,
				fields: this.state.form.fields,
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

		validate(formData) {
			if (schema) {
				return schema.validate(formData, { abortEarly: false })
					.catch(validationError => {
						const errors = validationError.inner.reduce((obj, e) => {
							obj[e.path] = e.message.replace(e.path, '{0}');
							return obj;
						}, {});
						return Promise.reject(errors);
					});
			} else return Promise.resolve(formData);
		}
	};

	ComponentWithForm.displayName = `${Component.displayName || Component.name || 'Component'}WithForm`;

	return ComponentWithForm;
}

export default withForm;
