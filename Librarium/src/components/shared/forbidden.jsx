import forbiddenKnowledgeImage from '../../images/book-locked.png';
import { Link } from 'react-router-dom';
import React from 'react';
import View from './view';

export default function Forbidden() {
	return (
		<View title="Forbidden">
			<h2>Forbidden!</h2>
			<p>You need to <Link to="/subscribe">subscribe</Link> in order to use this resource!</p>
			<br />
			<img alt="Forbidden Knowledge" className="mw-100" src={forbiddenKnowledgeImage} />
		</View>
	);
}
