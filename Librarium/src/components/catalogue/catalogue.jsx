import CataloguePagination from './catalogue-pagination';
import CatalogueSearch from './catalogue-search';
import CatalogueTile from './catalogue-tile';
import GoogleBooks from '../../services/google-books';
import PageTitle from '../shared/page-title';
import React from 'react';
import SessionContext from '../../contexts/session-context';

const defaultSearchCriteria = {
	filter: 'full',
	maxResults: 12,
	orderBy: 'newest',
	subject: 'computers'
};

class Catalogue extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			itemsPerPage: 12,
			pagesCount: 1
		};
		GoogleBooks.search(defaultSearchCriteria).then(result => {
			const items = this.sanitizeItems(result.items);
			const pagesCount = Math.ceil(result.totalItems / this.state.itemsPerPage);
			this.setState({ items, pagesCount });
		}).catch(console.error);
	}

	render() {
		const tiles = this.state.items.map((item, index) => {
			const imageUrl = this.sanitizeImageUrl(item.volumeInfo.imageLinks.thumbnail);
			return <CatalogueTile id={item.id} imageUrl={imageUrl} key={index} title={item.volumeInfo.title} />
		});
		return (
			<React.Fragment>
				<PageTitle value="Catalogue" />
				<section id="catalogue">
					<aside id="catalogue-search">
						<CatalogueSearch />
					</aside>
					<div id="catalogue-viewer">
						<div id="catalogue-list">{tiles}</div>
						<footer id="catalogue-pagination">
							<CataloguePagination pagesCount={this.state.pagesCount} />
						</footer>
					</div>
				</section>
			</React.Fragment>
		);
	}

	sanitizeImageUrl(imageUrl) {
		return imageUrl.replace(/[?&]edge=[^&]*/, '')
			.replace(/([?&])zoom=[^&]*/, (match, $1) => $1 + 'zoom=1');
	}

	sanitizeItems(items) {
		let sanitizedItems = [];
		for (const item of items) {
			if (sanitizedItems.every(si => si.id !== item.id)) {
				sanitizedItems.push(item);
			}
		}
		return sanitizedItems;
	}
}

Catalogue.contextType = SessionContext;

export default Catalogue;
