import React, { useEffect, useRef } from 'react';
import View from '../shared/view';

function ReadingViewer(props) {
	const readingId = props.match.params.id;
	const viewerRef = useRef(null);

	const handleLoadError = () => {
		props.history.push('/moved');
	}

	const handleLoadSuccess = (viewer) => {
		console.log(viewer);
	}

	const loadViewer = () => {
		const viewer = new window.google.books.DefaultViewer(viewerRef.current);
		viewer.load(readingId, handleLoadError, handleLoadSuccess);
	}

	//TODO: USE CONTEXT TO PRELOAD SCRIPT ?

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://www.google.com/books/jsapi.js';
		script.onload = () => {
			window.google.books.setOnLoadCallback(loadViewer);
			window.google.books.load();
		}
		document.head.appendChild(script);

		return () => {
			Array.from(document.getElementsByTagName('script'))
				.filter(s => s.src.includes('google.com/books'))
				.forEach(s => document.head.removeChild(s));
		}
	}, [readingId]);

	//TODO: SWITCH TO CLASS IN ORDER TO INITIALIZE VIEWER BEFORE RENDER

	return (
		<View title="Reader">
			<div className="reading-viewer" ref={viewerRef}>Loading...</div>
		</View>
	);
}

export default ReadingViewer;
