class Subscriber {
	constructor(data) {
		this.bankCardNumber = data.bankCardNumber;
		this.email = data.emailAddress || data.email;
		this.fullName = data.name || data.fullName;
		this.password = data.password;
		this.physicalAddress = data.address || data.physicalAddress;
		this.postalCode = data.postCode || data.postalCode;
		this.username = data.alias || data.username;
	}

	toString() {
		return this.fullName || this.username;
	}
}

export default Subscriber;
