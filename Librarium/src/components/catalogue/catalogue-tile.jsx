import defaultImageUrl from '../../images/book-and-quill.jpg'
import { Link } from 'react-router-dom';
import React from 'react';

class CatalogueTile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
		};
		this.handleError = this.handleError.bind(this);
	}

	componentDidMount() {
		this.setState({ isLoading: false });
	}

	handleError() {
		this.setState({ imageUrl: defaultImageUrl });
	}

	render() {
		const { id, imageUrl, title } = this.props;
		const { isLoading } = this.state;
		return (
			<div className="catalogue-tile">
				<Link to={isLoading ? '#' : `/catalogue/details/${id}`}>
					<img
						alt={isLoading ? 'Front Cover' : title}
						onError={this.handleError}
						src={isLoading ? defaultImageUrl : imageUrl}
						title={title}
					/>
				</Link>
			</div>
		);
	}
}

export default CatalogueTile;
