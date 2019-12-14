import Button from '../shared/button';
import ButtonBack from '../shared/button-back';
import DateUtilities from '../../utilities/date';
import Form from '../shared/form';
import InputGroup from '../shared/input-group';
import Kinvey from '../../services/kinvey';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import ObjectUtilities from '../../utilities/object';
import React from 'react';
import SelectGroup from '../shared/select-group';
import SessionContext from '../../contexts/session-context';
import SubscriptionModel from '../../models/subscription';
import { subscriptionSchema } from '../../utilities/validation';
import View from '../shared/view';
import withForm from '../higher-order/with-form';

class Subscribe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSubscribed: false
		}
		this.parseSubscriptionData = this.parseSubscriptionData.bind(this);
		this.subscribe = this.subscribe.bind(this);
		this.subscriptionOptions = [
			{ text: 'Choose a subscription plan', value: '' },
			{ text: '1 minute for ƛ0.08', value: 'm_0.08' },
			{ text: 'One month for ƛ11.65', value: 'M_11.65' },
			{ text: 'A quarter for ƛ33.35', value: 'Q_33.35' },
			{ text: 'Half a year for ƛ66.2', value: 'H_66.2' },
			{ text: 'Full year for ƛ133', value: 'Y_133' }
		];
		this.loadUserData();
	}

	static contextType = SessionContext;

	loadUserData() {
		const { authToken, userId } = this.props.location.state;
		Promise.all([
			Kinvey.checkHasActiveSubscription(userId),
			Kinvey.getUser(userId, authToken)
		]).then(([status, userData]) => {
			if (status.hasActiveSubscription === true) {
				this.setState({ isSubscribed: true });
			}
			let formData = ObjectUtilities.pickKeys(userData,
				['bankCardNumber', 'physicalAddress', 'postalCode']
			);
			this.props.form.populate(formData);
		}).catch(console.error);
	}

	parseSubscriptionData(formData) {
		const dateStart = new Date();
		let dateEnd = new Date(dateStart);
		const name = this.subscriptionOptions
			.filter(o => o.value === formData.subscription)[0].text;
		const subscriptionPlan = formData.subscription.split('_');
		const price = parseFloat(subscriptionPlan[1]);
		const subscriberId = this.context.session.user.id;
		const type = subscriptionPlan[0];
		switch (type) {
			case 'H':
				DateUtilities.applyMonths(dateEnd, 6);
				break;
			case 'm':
				DateUtilities.applyMinutes(dateEnd, 1);
				break;
			case 'M':
				DateUtilities.applyMonths(dateEnd, 1);
				break;
			case 'Q':
				DateUtilities.applyMonths(dateEnd, 3);
				break;
			case 'Y':
				DateUtilities.applyYears(dateEnd, 1);
				break;
			default: throw new Error('Invalid type of subscription!');
		}
		return { dateEnd, dateStart, name, price, subscriberId, type };
	}

	render() {
		const { errors, fields, handleChange, handleSubmit } = this.props.form;
		const { isSubscribed } = this.state;
		return (
			<View title="Subscribe">
				<Form errors={errors} fields={fields} onSubmit={e => handleSubmit(e, this.subscribe)} title="Subscription Form">
					<SelectGroup disabled={isSubscribed} error={errors.subscription} label="Subscription&nbsp;plan" name="subscription" onChange={handleChange} options={this.subscriptionOptions} value={fields.subscription} />
					{isSubscribed && (
						<div className="annotation">
							<span>You already have an active subscription.</span>
							<br />
							<span>Wait for it to expire before making a new one.</span>
							<br />
							<span>Thank you for your interest though!</span>
						</div>
					)}
					<fieldset>
						<legend>Billing information*:</legend>
						<div className="annotation">
							<span>* Taken from your current profile data where available.</span>
							<br />
							<span>If you want to change the details for this transaction only, do so here.</span>
							<br />
							<span>Alternatively, edit your profile to update billing information permanently.</span>
						</div>
						<InputGroup disabled={isSubscribed} error={errors.bankCardNumber} label="Bank card №" name="bankCardNumber" onChange={handleChange} placeholder="**** **** **** 4321" required type="text" value={fields.bankCardNumber || ''} />
						<InputGroup disabled={isSubscribed} error={errors.physicalAddress} label="Physical address" name="physicalAddress" onChange={handleChange} placeholder="City, District, Street, Building etc." type="text" value={fields.physicalAddress || ''} />
						<InputGroup disabled={isSubscribed} error={errors.postalCode} label="Postal code" name="postalCode" onChange={handleChange} placeholder="1234" type="text" value={fields.postalCode || ''} />
						<br />
						<InputGroup disabled={isSubscribed} error={errors.termsConsent} label="I have read and agree with all subscription terms and conditions" name="termsConsent" onChange={handleChange} type="checkbox" value={fields.termsConsent || false} />
					</fieldset>
					<Button disabled={isSubscribed} label="Subscribe" type="submit" />
					<ButtonBack fallback="/" />
					<small className="float-right">
						<Link className="text-small" to="/terms">Terms and conditions</Link>
					</small>
				</Form>
			</View>
		);
	}

	subscribe(formData) {
		const subscriptionData = this.parseSubscriptionData(formData);
		const subscriptionModel = new SubscriptionModel(subscriptionData);
		const { authToken, id, roles } = this.context.session.user;
		Promise.all([
			Kinvey.addSubscription(subscriptionModel, authToken),
			Kinvey.getRoles()
		]).then(([subscriptionData, rolesData]) => {
			const roleName = 'Subscribers';
			const roleId = rolesData.filter(role => role.name === roleName)[0]._id;
			Kinvey.grantRole(id, roleId).then(() => {
				roles.push(roleName);
				this.context.session.authorize(roles);
			}).catch(console.error);
			this.props.history.push('/');
			NotificationManager.success('Subscription recorded', null, 3000);
		}).catch(console.error);
	}
}

export default withForm(Subscribe, subscriptionSchema);
