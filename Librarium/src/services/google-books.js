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
	* @param {Number} pageNumber - specifies which page of the final data set should be retrieved
	* @param {String} printType - 'books' | 'magazines'
	* @param {String} subject - a category string that best describes the main theme of the material
	* @param {String} text - a word or a phrase to be found anywhere in the material's data set
	*/
	search(criteria) {
		// console.log(criteria);
		const { filter, maxResults, orderBy, printType, subject, text } = criteria;
		let queryParams = [
			text ? `q=${text}` : 'q=programming',
			subject ? `subject:${subject}` : undefined,
		];
		let searchArgs = [
			filter ? `filter=${filter}` : undefined,
			maxResults ? `maxResults=${maxResults}` : undefined,
			orderBy ? `orderBy=${orderBy}` : undefined,
			printType ? `printType=${printType}` : undefined,
			queryParams.filter(p => p !== undefined).join('+')
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
