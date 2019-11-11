class KinveyDatabase {
	constructor(appKey, appSecret) {
		this.appKey = appKey;
		this.appSecret = appSecret;
		this.host = 'https://baas.kinvey.com';
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

const Database = new KinveyDatabase('kid_HymBUlDoS', 'b7cca63c32eb42e19ab6de9e3d10bd5c');

export default Database;
