import Button from '../../components/shared/button';
import Form from '../../components/shared/form';
import InputGroup from '../../components/shared/input-group';
import React from 'react';
import withForm from '../higher-order/with-form';

class CatalogueSearch extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {

	// 	};
	// 	this.handleChange = this.handleChange.bind(this);
	// 	this.handleSubmit = this.handleSubmit.bind(this);
	// }

	// handleChange(event) {
	// 	const name = event.target.name;
	// 	const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
	// 	this.setState({ [name]: value });
	// }

	// handleSubmit(event) {
	// 	console.log('SEARCHING...');
	// }


	// <Form fields={fields} id="form-sign-in" onSubmit={e => handleSubmit(e, this.signIn)} title="Sign In Form">
	// <InputGroup label="Alias" name="alias" onChange={handleChange} required type="text" value={fields.alias || ''} />

	render() {
		// console.log(this.props.criteria);
		const { fields, handleChange, handleSubmit } = this.props.form;
		return (
			<Form fields={fields} id="form-catalogue-search" onSubmit={handleSubmit}>
				<fieldset>
					<InputGroup label="Results per page" name="itemsPerPage" onChange={handleChange} required type="select" value={fields.itemsPerPage || 10} />
				</fieldset>
				<Button label="Search" type="submit" />
			</Form>
		);
	}
}

export default withForm(CatalogueSearch);
