import CatalogueList from './catalogue-list';
import CataloguePagination from './catalogue-pagination';
import CatalogueSearch from './catalogue-search';
import GoogleBooks from '../../services/google-books';
import Loader from '../shared/loader';
import ObjectUtilities from '../../utilities/object';
import React from 'react';
import View from '../shared/view';

const defaultSearchCriteria = {
	filter: 'full',
	maxResults: 15,
	orderBy: 'newest',
	printType: 'all',
	startIndex: 0,
	subject: 'computers'
};

class Catalogue extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSearching: true,
			items: [],
			totalItems: 0
		};
		this.lastSearchCriteria = { ...defaultSearchCriteria };
		this.changePage = this.changePage.bind(this);
		this.changeSearchCriteria = this.changeSearchCriteria.bind(this);
		this.refresh = this.refresh.bind(this);
		this.search = this.search.bind(this);
	}

	changePage(pageNumber) {
		const itemsPerPage = +this.lastSearchCriteria.maxResults;
		this.refresh({
			startIndex: (pageNumber - 1) * itemsPerPage
		});
	}

	changeSearchCriteria(criteria) {
		criteria.startIndex = 0;
		this.refresh(criteria);
	}

	componentDidMount() {
		this.refresh({ text: 'programming', ...defaultSearchCriteria });
	}

	refresh(searchCriteria) {
		let newSearchCriteria = { ...this.lastSearchCriteria };
		Object.keys(searchCriteria).forEach(key => {
			newSearchCriteria[key] = searchCriteria[key];
		});
		if (!ObjectUtilities.equals(newSearchCriteria, this.lastSearchCriteria)) {
			this.search(newSearchCriteria).then(({ items, totalItems }) => {
				this.setState({ items, totalItems });
			});
		}
	}

	render() {
		const { isSearching, items, totalItems } = this.state;
		const { maxResults, startIndex } = this.lastSearchCriteria;
		const currentPage = Math.floor(startIndex / maxResults) + 1;
		const pagesCount = Math.ceil(totalItems / maxResults);
		const searchFormData = ObjectUtilities.dropKeys(this.lastSearchCriteria, 'startIndex');
		return (
			<View title="Catalogue">
				<section id="catalogue">
					<Loader isLoading={isSearching} />
					<CatalogueList items={items} />
					<aside id="catalogue-search">
						<CatalogueSearch data={searchFormData} onSearch={this.changeSearchCriteria} />
					</aside>
					<footer id="catalogue-pagination">
						<CataloguePagination currentPage={currentPage} onPageChange={this.changePage} pagesCount={pagesCount} />
					</footer>
				</section>
			</View>
		);
	}

	async search(criteria) {
		this.setState({ isSearching: true });
		const searchCriteria = { ...criteria };
		const itemsPerPage = +criteria.maxResults;
		let items = [];
		let totalItems = 0;
		while (items.length < itemsPerPage) {
			const searchResult = await GoogleBooks.search(criteria);
			if (!searchResult.items) break;
			totalItems = Math.max(totalItems, searchResult.totalItems);
			for (const item of searchResult.items) {
				if (items.every(i => i.id !== item.id)) {
					items.push(item);
					if (items.length >= itemsPerPage) break;
				}
			}
			criteria.startIndex += itemsPerPage;
		}
		this.lastSearchCriteria = searchCriteria;
		this.setState({ isSearching: false });
		return { items, totalItems };
	}
}

export default Catalogue;
