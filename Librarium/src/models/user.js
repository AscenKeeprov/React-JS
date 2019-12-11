class User {
	constructor(data) {
		this.bankCardNumber = data.bankCardNumber;
		this.email = data.email;
		this.fullName = data.fullName;
		this.password = data.password;
		this.physicalAddress = data.physicalAddress;
		this.postalCode = data.postalCode;
		this.username = data.username;
	}

	toString() {
		return this.fullName || this.username;
	}
}

export default User;
