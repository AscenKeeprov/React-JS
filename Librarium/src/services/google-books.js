class GoogleBooksAPI {
	constructor(apiKeys) {
		this.apiSource = 'https://www.google.com/books/api.js';
		this.host = 'https://www.googleapis.com/books/v1';
		this.projectApiKey = apiKeys.projectApiKey;
	}

	/**
	* Retrieve data for a volume with the given ID.
	*/
	getVolume(volumeId) {
		const searchString = '?fields=volumeInfo(authors,description,imageLinks/thumbnail,publishedDate,publisher,subtitle,title)';
		return fetch(`${this.host}/volumes/${volumeId}${searchString}`, {
			method: 'GET'
		}).then(this.parseResponse);
	}

	/**
	* Loads the Google Books embedded viewer API and exposes it in the global scope under window.google.books.
	* A callback function specifies what to do once the API is ready. It is called after the DOM is rendered.
	* @param {Function} onLoad
	*/
	loadApi(onLoad) {
		const script = document.createElement('script');
		script.src = this.apiSource;
		if (typeof onLoad !== 'function')
			console.warn('Provided API load callback is not a function!');
		else script.onload = onLoad;
		document.body.appendChild(script);
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
	* Removes default styling from a Google Books volume thumbnail URL.
	* If specified, zoom level will determine the size and quality of the image.
	* @param {Number} zoomLevel - integer in the range [1,5]. Default: 1 (small, low quality)
	*/
	sanitizeImageUrl(imageUrl, zoomLevel = 1) {
		if (!imageUrl) return '';
		if (zoomLevel < 1 || zoomLevel > 5) zoomLevel = 1;
		return imageUrl.replace(/[?&]edge=[^&]*/, '')
			.replace(/([?&])zoom=[^&]*/, (match, $1) => $1 + `zoom=${zoomLevel}`);
	}

	/**
	* Search for reading materials that conform with the given criteria.
	* @param {String} filter - 'ebooks' | 'free-ebooks' | 'full' | 'paid-ebooks' | 'partial'
	* @param {Number} maxResults - an integer denoting how many results should be returned at most
	* @param {String} inauthor - the author's name or parts of it
	* @param {String} inpublisher - the publisher's name or parts of it
	* @param {String} intitle - a word or a phrase to be found in the material's title
	* @param {String} orderBy - 'newest' | 'relevance'
	* @param {String} printType - 'books' | 'magazines'
	* @param {Number} startIndex - in combination with maxResults, determines which section of the final data set should be retrieved
	* @param {String} subject - a category string that best describes the main theme of the material
	* @param {String} text - a word or a phrase to be found anywhere in the material's data set
	*/
	search(criteria) {
		const { filter, inauthor, inpublisher, intitle, maxResults, orderBy, printType, startIndex, subject, text } = criteria;
		let queryParams = [
			text ? `${escape(text)}` : undefined,
			inauthor ? `inauthor:${escape(inauthor)}` : undefined,
			inpublisher ? `inpublisher:${escape(inpublisher)}` : undefined,
			intitle ? `intitle:${escape(intitle)}` : undefined,
			subject ? `subject:${subject}` : undefined
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

	unloadApi() {
		Array.from(document.body.querySelectorAll('script'))
			.filter(script => script.src === this.apiSource)
			.forEach(script => document.body.removeChild(script));
		Array.from(document.head.querySelectorAll('style'))
			.filter(style => style.textContent.includes('.swv-'))
			.forEach(style => document.head.removeChild(style));
	}
}

const GoogleBooks = new GoogleBooksAPI({
	projectApiKey: 'AIzaSyBzkp7mC9MfGbWz5VjNH38MEE1eG3MB3c8'
});

export default GoogleBooks;
