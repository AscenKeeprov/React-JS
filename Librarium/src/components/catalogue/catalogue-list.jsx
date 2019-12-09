import CatalogueTile from './catalogue-tile';
import GoogleBooks from '../../services/google-books';
import React from 'react';

function CatalogueList(props) {
	const tiles = props.items.map(({ etag, id, volumeInfo }) => {
		const imageUrl = GoogleBooks.sanitizeImageUrl(volumeInfo.imageLinks.thumbnail);
		return <CatalogueTile id={id} imageUrl={imageUrl} key={etag} title={volumeInfo.title} />
	});

	return (
		<div id="catalogue-list">
			{tiles.length > 0 ? tiles : <span>No reading materials match your search criteria.</span>}
		</div>
	);
}

export default CatalogueList;
