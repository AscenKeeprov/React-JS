import crypto from 'crypto';

/**
 * Encrypt a password with the given algorithm. Returns a Base64-encoded string.
 * @param {string} password
 * @param {string} algorithm - OpenSSL hashing algorithm. Default: 'SHA256'
  */
function encryptPassword(password, algorithm = 'sha256') {
	return crypto.createHash(algorithm.toLowerCase()).update(password).digest('base64');
}

/**
 * Compares provided password values
 * @param {string} password - Raw text value from front-end, entity model etc.
 * @param {Base64} passwordHash - Hash value from local storage, session storage, DB etc.
 */
function verifyPassword(password, passwordHash) {
	return encryptPassword(password) === passwordHash;
}

export default { encryptPassword, verifyPassword }
