import Button from '../../components/shared/button';
import Form from '../../components/shared/form';
import InputGroup from '../../components/shared/input-group';
import React from 'react';

class CatalogueSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
		this.setState({ [name]: value });
	}

	handleSubmit(event) {
		console.log('SEARCHING...');
	}

	render() {
		return (
			<Form id="form-catalogue-search" onSubmit={this.handleSubmit}>
				<fieldset>
					<InputGroup label="Results per page" name="itemsPerPage" onChange={this.handleChange} required type="number" value={this.state.itemsPerPage} />
				</fieldset>
				<Button label="Search" type="submit" />
			</Form>
		);
	}
}

export default CatalogueSearch;
