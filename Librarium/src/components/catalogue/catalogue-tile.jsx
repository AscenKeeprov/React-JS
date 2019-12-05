import defaultImageUrl from '../../images/book-and-quill.jpg'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function CatalogueTile(props) {
	const { id, imageUrl, title } = props;
	const [thumbnail, setThumbnail] = useState(defaultImageUrl);

	return (
		<div className="catalogue-tile">
			<Link to={`/catalogue/details/${id}`}>
				<img
					alt={title}
					onError={() => setThumbnail(defaultImageUrl)}
					onLoad={() => setThumbnail(imageUrl)}
					src={thumbnail}
					title={title}
				/>
			</Link>
		</div>
	);
}

export default CatalogueTile;
