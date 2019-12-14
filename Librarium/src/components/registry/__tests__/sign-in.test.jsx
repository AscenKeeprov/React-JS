import Form from '../../../components/shared/form';
import React from 'react';
import { shallow } from 'enzyme';
import SignIn from '../sign-in';

describe('Sign in view', () => {
	let signInView = null;

	afterEach(() => {
		signInView = null;
	});

	beforeEach(() => {
		signInView = shallow(<SignIn />);
	});

	it('renders without crashing', () => {
		expect(signInView).toMatchSnapshot();
	});

	it('contains one form component', () => {
		expect(signInView.html()).to.contain(Form);
	});
});
