import PageTitle from './page-title';
import React from 'react';

import lostKnowledgeImage from '../../images/book-torn.png';

class NotFound extends React.Component {
	render() {
		return (
			<React.Fragment>
				<PageTitle value="Not Found" />
				<h2>Not Found!</h2>
				<p>The material you are trying to find does not exist.</p>
				<br />
				<img alt="Lost Knowledge" className="mw-100" src={lostKnowledgeImage} />
			</React.Fragment>
		);
	}
}

export default NotFound;
