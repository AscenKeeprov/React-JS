/**
 * Filter out unwanted object properties based on their keys
 * @param {Object} obj - the object whose properties must be filtered
 * @param {String, Array} unwanted - a string or an array of strings specifying which keys should be removed
 */
export function filterByKeys(obj, unwanted) {
	if (typeof unwanted === 'string') {
		return Object.fromEntries(
			Object.entries(obj).filter(e => e[0] !== unwanted)
		);
	}
	if (Array.isArray(unwanted)) {
		return Object.fromEntries(
			Object.entries(obj).filter(e => !unwanted.includes(e[0]))
		);
	}
	return obj;
}
