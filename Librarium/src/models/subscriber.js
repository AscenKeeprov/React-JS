import crypto from '../services/crypto';

class Subscriber {
	constructor(data) {
		if (data._aut) this._aut = data._aut;
		if (data._id) this._id = data._id;
		this.cardNumber = data.cardNumber;
		this.emailAddress = data.emailAddress;
		this.fullName = data.fullName;
		if (data.password) this.password = crypto.encryptPassword(data.password);
		this.physicalAddress = data.physicalAddress;
		this.postalCode = data.postalCode;
		this.termsConsent = data.termsConsent;
		this.username = data.username;
	}

	toString() {
		return this.fullName || this.username;
	}
}

export default Subscriber;
