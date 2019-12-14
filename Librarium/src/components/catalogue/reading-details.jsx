import ButtonBack from '../shared/button-back';
import ButtonLink from '../shared/button-link';
import defaultThumbnailUrl from '../../images/book-and-quill.jpg'
import GoogleBooks from '../../services/google-books';
import Loader from '../shared/loader';
import React, { useEffect, useState } from 'react';
import View from '../shared/view';

function ReadingDetails(props) {
	const readingId = props.match.params.id;
	const [authors, setAuthors] = useState('Anonymous');
	const [datePublished, setDatePublished] = useState(undefined);
	const [description, setDescription] = useState('Loading description...');
	const [isLoading, setIsLoading] = useState(true);
	const [publisher, setPublisher] = useState('');
	const [subtitle, setSubtitle] = useState('Subtitle');
	const [thumbnail, setThumbnail] = useState(defaultThumbnailUrl);
	const [title, setTitle] = useState('Title');

	const parseDate = (date) => {
		if (date && date instanceof Date) {
			return date.toLocaleDateString(undefined, {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			});
		} else return '';
	}

	useEffect(() => {
		GoogleBooks.getVolume(readingId).then(({ volumeInfo }) => {
			setAuthors(volumeInfo.authors.join(', '));
			setDatePublished(new Date(volumeInfo.publishedDate));
			setDescription(volumeInfo.description);
			const thumbnailUrl = GoogleBooks.sanitizeImageUrl(volumeInfo.imageLinks.thumbnail, 2);
			setPublisher(volumeInfo.publisher)
			setSubtitle(volumeInfo.subtitle);
			setThumbnail(thumbnailUrl);
			setTitle(volumeInfo.title);
			setIsLoading(false);
		});
	}, [readingId]);

	return (
		<View title="Book Details">
			<Loader isLoading={isLoading} />
			<div className="reading-details">
				<header>
					<h4 className="reading-title">{title}</h4>
					{subtitle && <p className="reading-subtitle">{subtitle}</p>}
					<div className="reading-info">
						<p><b>Authors:</b> <span>{authors}</span></p>
						<p><b>Publisher:</b> <span>{publisher}</span></p>
						<p><b>Date published:</b> <span>{datePublished ? parseDate(datePublished) : ''}</span></p>
					</div>
				</header>
				<hr />
				<aside>
					<img alt={title} onError={() => setThumbnail(defaultThumbnailUrl)} src={thumbnail} title={title} />
				</aside>
				<div className="main">
					<h6>Synopsis</h6>
					<div className="synopsis" dangerouslySetInnerHTML={{ __html: `${description}` }} />
				</div>
				<hr />
				<footer>
					<ButtonLink label="Read" to={`/catalogue/read/${readingId}`} />
					<ButtonBack fallback="/catalogue" />
				</footer>
			</div>
		</View>
	);
}

export default ReadingDetails;
