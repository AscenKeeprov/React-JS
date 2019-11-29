import React from 'react';

class Form extends React.Component {
	render() {
		const formProps = Object.fromEntries(
			Object.entries(this.props).filter(e => e[0] !== 'title')
		);
		return (
			<form {...formProps}>
				{this.props.title && <h1 className="heading">{this.props.title}</h1>}
				{this.props.children}
			</form>
		);
	}
}

export default Form;