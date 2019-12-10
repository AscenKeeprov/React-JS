import GoogleBooks from '../../services/google-books';
import React from 'react';
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
