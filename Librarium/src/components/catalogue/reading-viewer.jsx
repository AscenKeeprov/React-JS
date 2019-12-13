import GoogleBooks from '../../services/google-books';
import Kinvey from '../../services/kinvey';
import React from 'react';
import SessionContext from '../../contexts/session-context';
import View from '../shared/view';

class ReadingViewer extends React.Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
		this.handleLoadError = this.handleLoadError.bind(this);
		GoogleBooks.loadApi(() => {
			const viewer = new window.google.books.DefaultViewer(this.canvasRef.current);
			viewer.load(props.match.params.id, this.handleLoadError);
		});
	}

	static contextType = SessionContext;

	componentDidMount() {
		const userId = this.context.session.user.id;
		Kinvey.checkHasActiveSubscription(userId).then(status => {
			if (status.hasActiveSubscription === false) {
				this.props.history.push('/signout');
			}
		}).catch(console.error);
	}

	componentWillUnmount() {
		GoogleBooks.unloadApi();
	}

	handleLoadError() {
		this.props.history.replace('/moved');
	}

	render() {
		return (
			<View title="Reader">
				<div className="reading-viewer" ref={this.canvasRef}>Loading...</div>
			</View>
		);
	}
}

export default ReadingViewer;
