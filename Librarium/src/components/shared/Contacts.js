import React from 'react';

class Contacts extends React.Component {
	render() {
		const companyEmail = 'registry@librarium.com';
		const companyPhone = '(08)765-43-21';
		return (
			<address id="contacts">
				<a href={ `mailto:${companyEmail}` }>
					<span>{ companyEmail }</span>
				</a>
				<a href={ `tel:${companyPhone.replace(/[()-]/g, '').replace(/^0*/, '+9')}` }>
					<span>{ companyPhone }</span>
				</a>
			</address>
		);
	}
}

export default Contacts;
