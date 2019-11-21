class KinveyApp {
	constructor(appKey, appSecret) {
		this.appKey = appKey;
		this.appSecret = appSecret;
		this.host = 'https://baas.kinvey.com';
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
		return response.json().then(json => {
			if (json.error) {
				switch (json.error) {
					case 'IncompleteRequestBody':
						throw new Error('Required fields cannot be empty!');
					case 'InvalidCredentials':
						throw new Error('Invalid credentials!');
					case 'UserAlreadyExists':
						throw new Error(`This alias is already taken!`);
					default: throw new Error(json.description);
				}
			}
			return json;
		});
	}

	/**
	* Attempts to update an existing user.
	* Returns a JSON object containing user data if successful.
	*/
	setUser(userModel) {
		let bodyJson = Object.fromEntries(
			Object.entries(userModel).filter(e => !e[0].startsWith('_'))
		);
		return fetch(`${this.host}/user/${this.appKey}/${userModel._id}`, {
			body: JSON.stringify(bodyJson),
			headers: {
				'Authorization': `Kinvey ${userModel._aut}`,
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

const Kinvey = new KinveyApp('kid_HymBUlDoS', 'b7cca63c32eb42e19ab6de9e3d10bd5c');

export default Kinvey;
