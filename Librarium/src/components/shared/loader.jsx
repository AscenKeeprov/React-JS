import React from 'react';
import watchImage from '../../images/watch.png';

function Loader({ isLoading }) {
	return isLoading ? (
		<div className="loader">
			<img alt="Loading..." src={watchImage} />
		</div>
	) : null;
}

export default Loader;
