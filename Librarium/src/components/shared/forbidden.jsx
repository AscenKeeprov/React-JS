import PageTitle from './page-title';
import React from 'react';

import forbiddenKnowledgeImage from '../../images/book-locked.png';

class Forbidden extends React.Component {
	render() {
		return (
			<React.Fragment>
				<PageTitle value="Forbidden" />
				<h2>Forbidden!</h2>
				<p>You are not allowed to use this resource.</p>
				<br />
				<img alt="Forbidden Knowledge" className="mw-100" src={forbiddenKnowledgeImage} />
			</React.Fragment>
		);
	}
}

export default Forbidden;
