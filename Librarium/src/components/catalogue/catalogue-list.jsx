import CatalogueTile from './catalogue-tile';
import React from 'react';

class CatalogueList extends React.Component {
	render() {
		const tiles = this.props.items.map(item => {
			const imageUrl = this.sanitizeImageUrl(item.volumeInfo.imageLinks.thumbnail);
			return <CatalogueTile id={item.id} imageUrl={imageUrl} key={item.etag} title={item.volumeInfo.title} />
		});
		return (
			<div id="catalogue-list">{tiles}</div>
		);
	}

	sanitizeImageUrl(imageUrl) {
		if (!imageUrl) return '';
		return imageUrl.replace(/[?&]edge=[^&]*/, '')
			.replace(/([?&])zoom=[^&]*/, (match, $1) => $1 + 'zoom=1');
	}
}

export default CatalogueList;
