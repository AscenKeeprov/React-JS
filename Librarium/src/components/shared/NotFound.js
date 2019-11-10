import PageTitle from './Page-Title';
import React from 'react';

class NotFound extends React.Component {
	render() {
		return (
			<React.Fragment>
				<PageTitle value="Not Found" />
				<h2>Not Found!</h2>
				<p>The resource you are trying to find does not exist.</p>
			</React.Fragment>
		);
	}
}

export default NotFound;
