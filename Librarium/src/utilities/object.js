export function equals(obj1, obj2) {
	obj1 = sortByKeys(obj1);
	obj2 = sortByKeys(obj2);
	return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Filter out unwanted object properties based on their keys
 * @param {Object} obj - the object whose properties will be checked
 * @param {String|Array<String>} unwanted - a string or an array of strings specifying which properties should be removed
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

/**
 * Extract desired object properties based on their keys
 * @param {Object} obj - the object whose properties will be checked
 * @param {String|Array<String>} wanted - a string or an array of strings specifying which properties should be returned
 */
export function getByKeys(obj, wanted) {
	if (typeof wanted === 'string') {
		return Object.fromEntries(
			Object.entries(obj).filter(e => e[0] === wanted)
		);
	}
	if (Array.isArray(wanted)) {
		return Object.fromEntries(
			Object.entries(obj).filter(e => wanted.includes(e[0]))
		);
	}
	return obj;
}

export function sortByKeys(obj) {
	return Object.fromEntries(
		Object.entries(obj).sort((e1, e2) => {
			if (typeof e1[1] === 'object') e1[1] = sortByKeys(e1[1]);
			if (typeof e2[1] === 'object') e2[1] = sortByKeys(e2[1]);
			return e1[0].localeCompare(e2[0])
		})
	);
}
