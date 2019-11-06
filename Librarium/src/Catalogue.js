import React from 'react';

const alphabet = new Array(26).fill().map((_, i) => String.fromCharCode(65 + i));
const alphaLinks = [];
for (const a of alphabet) {
	let link = `#${a}`;
	alphaLinks.push(<a href={ link }>&nbsp;{ a }&nbsp;</a>);
}

class Catalogue extends React.Component {
	render() {
		return (
			<div className="Catalogue">{ alphaLinks }</div>
		);
	}
}

export default Catalogue;
