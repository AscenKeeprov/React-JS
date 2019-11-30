import React from 'react';
import { filterByKeys } from '../../utilities/object';

class Form extends React.Component {
	render() {
		const formProps = filterByKeys(this.props, ['fields', 'title']);
		return (
			<form {...formProps}>
				{this.props.title && <h1 className="heading">{this.props.title}</h1>}
				{this.props.children}
			</form>
		);
	}
}

export default Form;
