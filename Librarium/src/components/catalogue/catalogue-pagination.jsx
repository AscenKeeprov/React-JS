import React from 'react';

class CataloguePagination extends React.Component {
	render() {
		const pages = new Array(this.props.pagesCount).fill().map((_, i) => {
			return <button className="button-page" key={i} type="button">{i + 1}</button>;
		});
		return <React.Fragment>{pages}</React.Fragment>;
	}
}

export default CataloguePagination;
