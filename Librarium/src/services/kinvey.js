class KinveyApp {
	constructor(apiKeys) {
		this.appKey = apiKeys.appKey;
		this.appSecret = apiKeys.appSecret;
		this.masterSecret = apiKeys.masterSecret;
		this.host = 'https://baas.kinvey.com';
	}

	checkEmailExists(emailJSON) {
		return fetch(`${this.host}/rpc/${this.appKey}/custom/check-email-exists`, {
			body: JSON.stringify(emailJSON),
			headers: {
				'Authorization': `Basic ${btoa(`${this.appKey}:${this.masterSecret}`)}`,
				'Content-Type': 'application/json'
			},
			method: 'POST'
		}).then(this.parseResponse);
	}

	checkUsernameExists(usernameJSON) {
		return fetch(`${this.host}/rpc/${this.appKey}/check-username-exists`, {
			body: JSON.stringify(usernameJSON),
			headers: {
				'Authorization': `Basic ${btoa(`${this.appKey}:${this.appSecret}`)}`,
				'Content-Type': 'application/json'
			},
			method: 'POST'
		}).then(this.parseResponse);
	}

	getRoles() {
		return fetch(`${this.host}/roles/${this.appKey}`, {
			headers: {
				'Authorization': `Basic ${btoa(`${this.appKey}:${this.masterSecret}`)}`,
				'Content-Type': 'application/json'
			},
			method: 'GET'
		}).then(this.parseResponse);
	}

	/**
	* Attempts to load data for a user with the given ID and authentication token.
	* Returns a JSON object containing user data if successful.
	*/
	getUser(userId, authToken) {
		return fetch(`${this.host}/user/${this.appKey}/${userId}`, {
			headers: {
				'Authorization': `Kinvey ${authToken}`
			},
			method: 'GET'
		}).then(this.parseResponse);
	}

	parseResponse(response) {
		if (response.status === 204) return response;
		else return response.json().then(json => {
			if (json.error) {
				switch (json.error) {
					case 'IncompleteRequestBody':
						throw new Error('Required fields cannot be empty!');
					case 'InvalidCredentials':
						throw new Error('Invalid credentials!');
					case 'UserAlreadyExists':
						throw new Error('This alias is already taken.');
					default: throw new Error(json.description);
				}
			}
			return json;
		});
	}

	/**
	* Attempts to reset a user's password.
	* @param {String} resetKey - a registered username or an e-mail address
	*/
	resetPassword(resetKey) {
		return fetch(`${this.host}/rpc/${this.appKey}/${resetKey}/user-password-reset-initiate`, {
			headers: {
				'Authorization': `Basic ${btoa(`${this.appKey}:${this.appSecret}`)}`
			},
			method: 'POST'
		}).then(this.parseResponse);
	}

	/**
	* Attempts to update an existing user.
	* Returns a JSON object containing user data if successful.
	*/
	setUser(userModel, userId, authToken) {
		return fetch(`${this.host}/user/${this.appKey}/${userId}`, {
			body: JSON.stringify(userModel),
			headers: {
				'Authorization': `Kinvey ${authToken}`,
				'Content-Type': 'application/json'
			},
			method: 'PUT'
		}).then(this.parseResponse);
	}

	/**
	* Attempts to authenticate a user with the given credentials.
	* Returns a JSON object containing user data if successful.
	*/
	signIn(credentials) {
		return fetch(`${this.host}/user/${this.appKey}/login`, {
			body: JSON.stringify(credentials),
			headers: {
				'Authorization': `Basic ${btoa(`${this.appKey}:${this.appSecret}`)}`,
				'Content-Type': 'application/json'
			},
			method: 'POST'
		}).then(this.parseResponse);
	}

	signOut(authToken) {
		return fetch(`${this.host}/user/${this.appKey}/_logout`, {
			headers: {
				'Authorization': `Kinvey ${authToken}`
			},
			method: 'POST'
		}).then(this.parseResponse);
	}

	/**
	* Attempts to create a new user.
	* Returns a JSON object containing user data if successful.
	*/
	signUp(userModel) {
		return fetch(`${this.host}/user/${this.appKey}`, {
			body: JSON.stringify(userModel),
			headers: {
				'Authorization': `Basic ${btoa(`${this.appKey}:${this.appSecret}`)}`,
				'Content-Type': 'application/json'
			},
			method: 'POST'
		}).then(this.parseResponse);
	}
}

const Kinvey = new KinveyApp({
	appKey: 'kid_HymBUlDoS',
	appSecret: 'b7cca63c32eb42e19ab6de9e3d10bd5c',
	masterSecret: 'd137acae4643473ea813fd9fc97c4804'
});

export default Kinvey;
