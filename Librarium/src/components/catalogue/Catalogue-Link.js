import React from 'react';

class CatalogueLink extends React.Component {
	render() {
		let char = String.fromCharCode(this.props.charCode);
		return (
			<a href={ `#${char}` }>{ char }</a>
		);
	}
}

export default CatalogueLink;
