import forbiddenKnowledgeImage from '../../images/book-locked.png';
import React from 'react';
import View from '../shared/view';

export default function Forbidden() {
	return (
		<View title="Forbidden">
			<h2>Forbidden!</h2>
			<p>You need a subscription in order to use this resource!</p>
			<br />
			<img alt="Forbidden Knowledge" className="mw-100" src={forbiddenKnowledgeImage} />
		</View>
	);
}
