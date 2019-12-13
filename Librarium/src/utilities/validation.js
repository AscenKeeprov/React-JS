import * as yup from 'yup';

const bankCardNumberPattern = /^\d{4}(?: \d{4}){3}$/;
const fullNamePattern = /^[A-Z](?:\.|[a-z]+)(?: [A-Z](?:\.|[a-z]+))*(?: [A-Z][a-z]+)$/;
const usernamePattern = /^\S+$/;

yup.setLocale({
	mixed: {
		required: '{0} cannot be empty!'
	},
	string: {
		email: '{0} is not valid',
		matches: '{0} is not valid'
	}
});

export const profileSchema = yup.object().shape({
	bankCardNumber: yup.lazy(value => value
		? yup.string().matches(bankCardNumberPattern)
		: yup.mixed().notRequired()),
	email: yup.string().trim().required().email(),
	fullName: yup.lazy(value => value
		? yup.string().matches(fullNamePattern)
		: yup.mixed().notRequired()),
	password: yup.lazy(value => value
		? yup.string().trim().min(8).required()
		: yup.mixed().notRequired()),
	rePassword: yup.string().oneOf([yup.ref('password')], 'Password mismatch'),
	username: yup.string().trim().matches(usernamePattern).max(16).min(4).required()
});

export const singInSchema = yup.object().shape({
	password: yup.string().required(),
	username: yup.string().required()
});

export const singUpSchema = yup.object().shape({
	email: yup.string().trim().required().email(),
	fullName: yup.lazy(value => value
		? yup.string().matches(fullNamePattern)
		: yup.mixed().notRequired()),
	password: yup.string().trim().min(8).required(),
	rePassword: yup.string().oneOf([yup.ref('password')], 'Password mismatch'),
	username: yup.string().trim().matches(usernamePattern).max(16).min(4).required()
});

export const subscriptionSchema = yup.object().shape({
	bankCardNumber: yup.string().matches(bankCardNumberPattern).required(),
	subscription: yup.string().required(),
	termsConsent: yup.boolean().oneOf([true], 'We need your consent!')
});
