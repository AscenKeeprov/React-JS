class GoogleBooksAPI {
	constructor(apiKeys) {
		this.projectApiKey = apiKeys.projectApiKey;
		this.host = 'https://www.googleapis.com/books/v1';
	}

	parseResponse(response) {
		return response.json().then(json => {
			if (json.error) {
				throw new Error(response.error.errors[0].message);
			}
			return json;
		});
	}

	/**
	* Search for reading materials that conform with the given criteria.
	* @param {String} filter - 'ebooks' | 'free-ebooks' | 'full' | 'paid-ebooks' | 'partial'
	* @param {Number} maxResults - an integer denoting how many results should be returned at most
	* @param {String} orderBy - 'newest' | 'relevance'
	* @param {String} printType - 'books' | 'magazines'
	* @param {Number} startIndex - in combination with maxResults, determines which section of the final data set should be retrieved
	* @param {String} subject - a category string that best describes the main theme of the material
	* @param {String} text - a word or a phrase to be found anywhere in the material's data set
	*/
	search(criteria) {
		const { filter, maxResults, orderBy, printType, startIndex, subject, text } = criteria;
		let queryParams = [
			text ? `${text}` : undefined,
			subject ? `subject:${subject}` : undefined,
		];
		queryParams = queryParams.filter(p => p !== undefined);
		const queryString = `q=${queryParams.join('+')}`;
		let searchArgs = [
			'fields=items(etag,id,volumeInfo(imageLinks/thumbnail,title)),totalItems',
			filter ? `filter=${filter}` : undefined,
			maxResults ? `maxResults=${maxResults}` : undefined,
			orderBy ? `orderBy=${orderBy}` : undefined,
			printType ? `printType=${printType}` : undefined,
			queryString,
			startIndex ? `startIndex=${startIndex}` : undefined
		];
		searchArgs = searchArgs.filter(a => a !== undefined);
		const searchString = searchArgs.length > 0 ? `?${searchArgs.join('&')}` : '';
		return fetch(`${this.host}/volumes${searchString}`, {
			method: 'GET'
		}).then(this.parseResponse);
	}
}

const GoogleBooks = new GoogleBooksAPI({
	projectApiKey: 'AIzaSyBzkp7mC9MfGbWz5VjNH38MEE1eG3MB3c8'
});

export default GoogleBooks;
