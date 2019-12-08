import CatalogueTile from './catalogue-tile';
import React from 'react';

function CatalogueList(props) {
	const tiles = props.items.map(item => {
		const imageUrl = sanitizeImageUrl(item.volumeInfo.imageLinks.thumbnail);
		return <CatalogueTile id={item.id} imageUrl={imageUrl} key={item.etag} title={item.volumeInfo.title} />
	});

	return (
		<div id="catalogue-list">
			{tiles.length > 0 ? tiles : <span>No reading materials match your search criteria.</span>}
		</div>
	);
}

function sanitizeImageUrl(imageUrl) {
	if (!imageUrl) return '';
	return imageUrl.replace(/[?&]edge=[^&]*/, '')
		.replace(/([?&])zoom=[^&]*/, (match, $1) => $1 + 'zoom=1');
}

export default CatalogueList;
