import CatalogueLink from './catalogue-link';
import React from 'react';

class Catalogue extends React.Component {
	render() {
		const index = new Array(26).fill().map((_, i) => {
			let charCode = 65 + i;
			return <CatalogueLink charCode={ charCode } key={ charCode } />;
		});
		return (
			<section className="Catalogue">{ index }</section>
		);
	}
}

export default Catalogue;
