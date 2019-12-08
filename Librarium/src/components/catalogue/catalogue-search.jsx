import Button from '../../components/shared/button';
import Form from '../../components/shared/form';
import InputGroup from '../../components/shared/input-group';
import InputSet from '../../components/shared/input-set';
import React from 'react';
import SelectGroup from '../shared/select-group';
import withForm from '../higher-order/with-form';

function CatalogueSearch(props) {
	const { fields, handleChange, handleSubmit } = props.form;

	const filterOptions = [
		{ label: 'Free eBooks', value: 'free-ebooks' },
		{ label: 'Full', value: 'full' },
		{ label: 'Partial', value: 'partial' }
	];

	const maxResultsOptions = new Array(8).fill().map((_, i) => {
		const value = (i + 1) * 5;
		return { text: `${value}`, value }
	});

	const printTypeOptions = [
		{ label: 'All', value: 'all' },
		{ label: 'Books', value: 'books' },
		{ label: 'Magazines', value: 'magazines' }
	];

	const subjectOptions = ['Art', 'Chemistry', 'Computers', 'Cooking', 'Ecology', 'Economics', 'Engineering',
		'Health', 'History', 'Music', 'Science', 'Philosophy', 'Politics', 'Technology'].map(subject => {
			return { text: subject, value: subject.toLowerCase() }
		});

	const parseSearchCriteria = (formData) => {
		formData.maxResults = parseInt(formData.maxResults);
		props.onSearch(formData);
	}

	return (
		<Form fields={fields} onSubmit={e => handleSubmit(e, parseSearchCriteria)}>
			<fieldset>
				<legend>Filter by:</legend>
				<SelectGroup label="Category" name="subject" onChange={handleChange} options={subjectOptions} value={fields.subject} />
				<InputSet label="Issue type" name="filter" onChange={handleChange} options={filterOptions} type="radio" />
				<InputSet label="Print type" name="printType" onChange={handleChange} options={printTypeOptions} type="radio" />
			</fieldset>
			<hr />
			<fieldset>
				<legend>Look for:</legend>
				<InputGroup label="Author" name="inauthor" onChange={handleChange} type="text" value={fields.inauthor || ''} />
				<InputGroup label="Keywords" name="text" onChange={handleChange} type="text" value={fields.text || ''} />
				<InputGroup label="Publisher" name="inpublisher" onChange={handleChange} type="text" value={fields.inpublisher || ''} />
				<InputGroup label="Title" name="intitle" onChange={handleChange} type="text" value={fields.intitle || ''} />
			</fieldset>
			<SelectGroup label="Results per page" name="maxResults" onChange={handleChange} options={maxResultsOptions} value={fields.maxResults} />
			<Button label="Search" type="submit" />
		</Form>
	);
}

export default withForm(CatalogueSearch);
