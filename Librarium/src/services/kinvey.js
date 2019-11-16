class KinveyApp {
	constructor(appKey, appSecret) {
		this.appKey = appKey;
		this.appSecret = appSecret;
		this.host = 'https://baas.kinvey.com';
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
		}).then(res => {
			return res.json().then(json => {
				if (json.error) {
					switch (json.error) {
						case 'IncompleteRequestBody':
							throw new Error('Credentials cannot be empty!');
						case 'InvalidCredentials':
							throw new Error('Invalid credentials!');
						default: throw new Error(json.description);
					}
				}
				return json;
			});
		});
	}

	signOut(authToken) {
		return fetch(`${this.host}/user/${this.appKey}/_logout`, {
			headers: {
				'Authorization': `Kinvey ${authToken}`
			},
			method: 'POST'
		});
	}

	/**
	 * Creates a new user and returns a Kinvey authentication token
	 */
	signUp(user) {
		return fetch(`${this.host}/user/${this.appKey}`, {
			body: JSON.stringify(user),
			headers: {
				'Authorization': `Basic ${btoa(`${this.appKey}:${this.appSecret}`)}`,
				'Content-Type': 'application/json'
			},
			method: 'POST'
		}).then(res => {
			return res.json().then(json => {
				if (json.error) {
					switch (json.error) {
						case 'UserAlreadyExists':
							throw new Error(`Alias '${user.username}' is already taken!`);
						default: throw new Error(json.description);
					}
				}
				return json._kmd.authtoken;
			});
		});
	}
}

const Kinvey = new KinveyApp('kid_HymBUlDoS', 'b7cca63c32eb42e19ab6de9e3d10bd5c');

export default Kinvey;
