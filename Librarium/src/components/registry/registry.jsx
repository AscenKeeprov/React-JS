import featherImage from '../../images/filigree-feather.png';
import { Link } from 'react-router-dom';
import React from 'react';
import View from '../shared/view';

export default function Registry() {
	return (
		<View title="Registry">
			<section id="registry">
				<h1 className="heading">Welcome to Librarium!</h1>
				<div>
					<img alt="Feather" className="flip-horizontal float-inline-end" src={featherImage} />
					<p>Browse our catalogue for the latest book and periodic press issues.</p>
				</div>
				<div>
					<img alt="Feather" className="float-inline-start" src={featherImage} />
					<p><Link to="/subscribe">Subscribe</Link> to get access to high-quality EPUB and PDF content for your preferred reading device.</p>
				</div>
			</section>
		</View>
	);
}
