import React from 'react';

export default function Contacts() {
	const companyEmail = 'registry@librarium.com';
	const companyPhone = '(08)765-43-21';
	const companyPhoneRef = companyPhone
		.replace(/[()-]/g, '')
		.replace(/^0*/, '+9');
	return (
		<address id="contacts">
			<a href={`mailto:${companyEmail}`}>
				<span>{companyEmail}</span>
			</a>
			<a href={`tel:${companyPhoneRef}`}>
				<span>{companyPhone}</span>
			</a>
		</address>
	);
}
