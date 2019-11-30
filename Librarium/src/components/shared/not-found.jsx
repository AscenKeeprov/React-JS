import lostKnowledgeImage from '../../images/book-torn.png';
import React from 'react';
import View from '../shared/view';

export default function NotFound() {
	return (
		<View title="Not Found">
			<h2>Not Found!</h2>
			<p>The material you are trying to find does not exist.</p>
			<br />
			<img alt="Lost Knowledge" className="mw-100" src={lostKnowledgeImage} />
		</View>
	);
}
