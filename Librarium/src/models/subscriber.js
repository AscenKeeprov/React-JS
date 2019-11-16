import crypto from '../services/crypto';

class Subscriber {
	constructor(data) {
		this.cardNumber = data.cardNumber;
		this.emailAddress = data.emailAddress;
		this.fullName = data.fullName;
		this.password = crypto.encryptPassword(data.password);
		this.physicalAddress = data.physicalAddress;
		this.postalCode = data.postalCode;
		this.termsConsent = data.termsConsent;
		this.username = data.username;
	}

	toString() {
		return this.fullName;
	}
}

export default Subscriber;
