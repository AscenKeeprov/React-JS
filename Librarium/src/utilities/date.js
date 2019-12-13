class DateTypeError extends Error {
	constructor() {
		super('Object is not an actual date!');
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, DateTypeError);
		}
	}
}

class ModifierTypeError extends Error {
	constructor() {
		super('Modifier must be a number!');
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ModifierTypeError);
		}
	}
}

/**
 * Add / subtract minutes to / from a date.
 * @param {Date} date
 * @param {Number} minutes - an integer
 */
export function applyMinutes(date, minutes) {
	if (date instanceof Date === false) throw new DateTypeError();
	if (typeof minutes !== 'number') throw new ModifierTypeError();
	minutes = Math.trunc(minutes);
	return date.setUTCMinutes(date.getUTCMinutes() + minutes);
}

/**
 * Add / subtract months to / from a date.
 * @param {Date} date
 * @param {Number} months - an integer
 */
export function applyMonths(date, months) {
	if (date instanceof Date === false) throw new DateTypeError();
	if (typeof months !== 'number') throw new ModifierTypeError();
	months = Math.trunc(months);
	return date.setUTCMonth(date.getUTCMonth() + months);
}

/**
 * Add / subtract years to / from a date.
 * @param {Date} date
 * @param {Number} years - an integer
 */
export function applyYears(date, years) {
	if (date instanceof Date === false) throw new DateTypeError();
	if (typeof years !== 'number') throw new ModifierTypeError();
	years = Math.trunc(years);
	return date.setUTCFullYear(date.getUTCFullYear() + years);
}

const DateUtilities = { applyMinutes, applyMonths, applyYears };

export default DateUtilities;
