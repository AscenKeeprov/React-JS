class CatalogueItem {
	constructor(data) {
		this.id = data.id;
		this.imageUrl = data.volumeInfo.imageLinks.thumbnail;
		this.title = data.volumeInfo.title;
	}

	toString() {
		return this.title;
	}
}

export default CatalogueItem;
