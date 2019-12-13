import forbiddenKnowledgeImage from '../../images/book-locked.png';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import SessionContext from '../../contexts/session-context';
import View from './view';

export default function Forbidden() {
	const { session } = useContext(SessionContext);
	return (
		<View title="Forbidden">
			<h2>Forbidden!</h2>
			<p>You need to <Link to={{
				pathname: `/subscribe`,
				state: {
					authToken: session.user.authToken,
					userId: session.user.id
				}
			}}>subscribe</Link> in order to use this resource!</p>
			<br />
			<img alt="Forbidden Knowledge" className="mw-100" src={forbiddenKnowledgeImage} />
		</View>
	);
}
