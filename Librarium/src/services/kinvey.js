class KinveyApp {
	constructor(appKey, appSecret) {
		this.appKey = appKey;
		this.appSecret = appSecret;
		this.host = 'https://baas.kinvey.com';
	}

	/**
	* Attempts to authenticate a user based on provided credentials.
	* Returns a Kinvey authentication token if successful.
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
					// switch (json.error) {
					// 	case 'UserAlreadyExists':
					// 		throw new Error(`Alias '${user.username}' is already taken!`);
					// 	default: throw new Error(json.description);
					// }
					return json.description;
				}
				return json._kmd.authtoken;
			});
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
