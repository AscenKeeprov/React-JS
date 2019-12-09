import movedKnowledgeImage from '../../images/book-case-empty.jpg';
import React from 'react';
import View from '../shared/view';

export default function Moved() {
	return (
		<View title="Moved">
			<h2>Resource moved!</h2>
			<p>The requested material is not available at the moment.</p>
			<br />
			<img alt="Moved Knowledge" className="mw-100" src={movedKnowledgeImage} />
		</View>
	);
}
