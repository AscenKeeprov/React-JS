class Subscription {
	constructor(data) {
		this.dateEnd = data.dateEnd;
		this.dateStart = data.dateStart;
		this.name = data.name;
		this.price = data.price;
		this.subscriberId = data.subscriberId
		this.type = data.type;
	}

	toString() {
		return this.name;
	}
}

export default Subscription;
