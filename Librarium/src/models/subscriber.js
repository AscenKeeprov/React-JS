class Subscriber {
	constructor(data) {
		if (data._aut) this._aut = data._aut;
		if (data._id) this._id = data._id;
		this.cardNumber = data.cardNumber;
		this.email = data.emailAddress || data.email;
		this.fullName = data.fullName;
		this.password = data.password;
		this.physicalAddress = data.physicalAddress;
		this.postalCode = data.postalCode;
		this.termsConsent = data.termsConsent;
		this.username = data.alias || data.username;
	}

	toString() {
		return this.fullName || this.username;
	}
}

export default Subscriber;
