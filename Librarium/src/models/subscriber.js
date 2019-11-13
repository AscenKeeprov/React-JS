import crypto from 'crypto';

class Subscriber {
	constructor(data) {
		this.cardNumber = data.cardNumber;
		this.emailAddress = data.emailAddress;
		this.fullName = data.fullName;
		this.password = this.encryptPassword(data.password);
		this.physicalAddress = data.physicalAddress;
		this.postalCode = data.postalCode;
		this.termsConsent = data.termsConsent;
		this.username = data.username;
	}

	encryptPassword(password) {
		let hash = crypto.createHash('sha256').update(password).digest('base64');
		let salt = crypto.randomBytes(16).toString('base64');
		return salt + hash;
	}

	verifyPassword(password) {
		return new Promise((resolve, reject) => {
			let hash = crypto.createHash('sha256').update(password).digest('base64');
			resolve(hash === this.password.split(/==/)[1]);
		});
	}
}

export default Subscriber;
