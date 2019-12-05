import CatalogueList from './catalogue-list';
import CataloguePagination from './catalogue-pagination';
import CatalogueSearch from './catalogue-search';
import { equals } from '../../utilities/object';
import GoogleBooks from '../../services/google-books';
import React from 'react';
import SessionContext from '../../contexts/session-context';
import View from '../shared/view';

const defaultSearchCriteria = {
	filter: 'full',
	maxResults: 15,
	orderBy: 'newest',
	startIndex: 0,
	subject: 'computers'
};

class Catalogue extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			totalItems: 0
		};
		this.lastSearchCriteria = { ...defaultSearchCriteria };
		this.changePage = this.changePage.bind(this);
		this.refresh = this.refresh.bind(this);
		this.search = this.search.bind(this);
		this.refresh({ text: 'programming', ...defaultSearchCriteria });
	}

	changePage(pageNumber) {
		const itemsPerPage = this.lastSearchCriteria.maxResults;
		this.refresh({
			startIndex: (pageNumber - 1) * itemsPerPage
		});
	}

	async refresh(criteria) {
		let searchCriteria = { ...this.lastSearchCriteria };
		Object.keys(criteria).forEach(key => {
			searchCriteria[key] = criteria[key];
		});
		if (!equals(searchCriteria, this.lastSearchCriteria)) {
			criteria = { ...searchCriteria };
			const { items, totalItems } = await this.search(criteria);
			this.setState({ items, totalItems }, () => {
				this.lastSearchCriteria = searchCriteria;
			});
		}
	}

	async search(criteria) {
		const itemsPerPage = criteria.maxResults;
		let items = [];
		let totalItems = 0;
		while (items.length < itemsPerPage) {
			const searchResult = await GoogleBooks.search(criteria);
			totalItems = Math.max(totalItems, searchResult.totalItems);
			for (const item of searchResult.items) {
				if (items.every(i => i.id !== item.id)) {
					items.push(item);
					if (items.length >= itemsPerPage) break;
				}
			}
			criteria.startIndex += itemsPerPage;
		}
		return { items, totalItems };
	}

	render() {
		const { items, totalItems } = this.state;
		const { maxResults } = this.lastSearchCriteria;
		const pagesCount = Math.ceil(totalItems / maxResults);
		return (
			<View title="Catalogue">
				<section id="catalogue">
					<CatalogueList items={items} />
					<aside id="catalogue-search">
						<CatalogueSearch criteria={this.lastSearchCriteria} />
					</aside>
					<footer id="catalogue-pagination">
						<CataloguePagination onPageChange={this.changePage} pagesCount={pagesCount} />
					</footer>
				</section>
			</View>
		);
	}
}

Catalogue.contextType = SessionContext;

export default Catalogue;
