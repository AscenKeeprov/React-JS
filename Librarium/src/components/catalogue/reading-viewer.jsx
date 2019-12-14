import GoogleBooks from '../../services/google-books';
import Kinvey from '../../services/kinvey';
import Loader from '../shared/loader';
import React from 'react';
import SessionContext from '../../contexts/session-context';
import View from '../shared/view';

class ReadingViewer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true
		};
		this.canvasRef = React.createRef();
		this.handleLoadError = this.handleLoadError.bind(this);
		this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
	}

	static contextType = SessionContext;

	componentDidMount() {
		const userId = this.context.session.user.id;
		Kinvey.checkHasActiveSubscription(userId).then(status => {
			if (status.hasActiveSubscription === false) {
				this.props.history.push('/signout');
			} else {
				GoogleBooks.loadApi(() => {
					const viewer = new window.google.books.DefaultViewer(this.canvasRef.current);
					viewer.load(readingId, this.handleLoadError, this.handleLoadSuccess);
				});
			}
		}).catch(console.error);
		const readingId = this.props.match.params.id;
	}

	componentWillUnmount() {
		GoogleBooks.unloadApi();
	}

	handleLoadError() {
		this.props.history.replace('/moved');
	}

	handleLoadSuccess() {
		this.setState({ isLoading: false });
	}

	render() {
		return (
			<View title="Reader">
				<Loader isLoading={this.state.isLoading} />
				<div className="reading-viewer" ref={this.canvasRef}>Loading...</div>
			</View>
		);
	}
}

export default ReadingViewer;
